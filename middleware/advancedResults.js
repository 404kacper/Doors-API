const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Helper function to handle population with exclusions recursively - use case at the end of this file
  function handlePopulation(populate) {
    let populationObject = {};

    // If path is an array with more than one element, we have nested populations
    if (Array.isArray(populate.path) && populate.path.length > 1) {
      populationObject.path = populate.path[0];
      populationObject.select = populate.select;
      populationObject.populate = handlePopulation({
        path: populate.path.slice(1),
        select: populate.populate && populate.populate.select,
        exclude: populate.populate && populate.populate.exclude,
      });
    } else {
      // If path is a string or an array of one element, we're at the deepest level of nesting
      populationObject.path = Array.isArray(populate.path)
        ? populate.path[0]
        : populate.path;

      if (populate.exclude) {
        populationObject.select = populate.exclude
          .split(' ')
          .map((field) => (field.startsWith('-') ? field : '-' + field))
          .join(' ');
      } else {
        populationObject.select = populate.select;
      }
    }

    return populationObject;
  }

  // Exclude Fields
  if (populate && populate.exclude) {
    const fields = populate.exclude
      .split(' ')
      .map((field) => (field.startsWith('-') ? field : '-' + field))
      .join(' ');
    query = query.select(fields);
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(handlePopulation(populate));
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;

// Example call to populate with advancedResults and recursion

// router
//   .route('/me')
//   .get(
//     protect,
//     authorize('guest', 'employee', 'admin'),
//     advancedResults(Card, {
//       path: ['door', 'manager'],
//       select: '-_id -cards -createdAt -__v',
//       populate: {
//         path: 'manager',
//         select: 'name email -_id',
//         exclude: 'password',
//         populate: {
//           path: 'team',
//           select: 'name members -_id',
//           exclude: 'created_at'
//         }
//       }
//     }),
//     getUserCards
//   );
