const asyncHandler = require('../middleware/async');
const Card = require('../models/Card');
const Door = require('../models/Door');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Create card
// @route     POST /api/cards
// @access    Private
exports.createCard = asyncHandler(async (req, res, next) => {
  const { user, status } = req.body;

  const card = await Card.create({
    user,
    status,
  });

  res.status(200).json({
    success: true,
    data: card,
  });
});

// @desc      Gets all cards
// @route     GET /api/cards
// @access    Private/Admin
exports.getCards = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Gets cards assigned to logged in user
// @route     GET /api/cards/me
// @access    Private
exports.getUserCards = asyncHandler(async (req, res, next) => {
  // Create a new copy of the advancedResults data object
  let userCards = { ...res.advancedResults };

  // Filter out the cards that belong to the current user and remove the 'user' field
  userCards.data = userCards.data.reduce((acc, card) => {
    if (card.user.toString() === req.user.id.toString()) {
      let { user, ...cardWithoutUser } = card.toObject(); // convert the document to a plain JS object first
      acc.push(cardWithoutUser);
    }
    return acc;
  }, []);

  res.status(200).json(userCards);
});

// @desc      Assigns status to card
// @route     PUT /api/cards/:id
// @access    Private
exports.manageStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (status !== 'lost' && status !== 'not lost') {
    return next(new ErrorResponse('Status can only be lost or not lost', 400));
  }

  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    {
      status: status,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: updatedCard,
  });
});

// @desc      Assign card to a door
// @route     PUT /api/cards
// @access    Private/Admin
exports.assignCard = asyncHandler(async (req, res, next) => {
  const { card, number } = req.body;

  const matchedDoor = await Door.findOne({ number });

  if (matchedDoor) {
    const updatedCard = await Card.findByIdAndUpdate(
      card,
      {
        door: matchedDoor.id,
      },
      { new: true, runValidators: true }
    );

    // Check if the updatedCard.id already exists in the cards array
    if (matchedDoor.cards.includes(updatedCard.id)) {
      return next(
        new ErrorResponse(
          `Card ${updatedCard.id} is already assigned to door ${matchedDoor.number}`,
          400
        )
      );
    }

    // Push unique card to cards array
    matchedDoor.cards.push(updatedCard.id);
    await matchedDoor.save();

    res.status(200).json({
      success: true,
      data: updatedCard,
    });
  } else {
    next(new ErrorResponse(`No matching door found`, 404));
  }
});
