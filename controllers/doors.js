const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Door = require('../models/Door');

// @desc      Create door
// @route     POST /api/doors
// @access    Private/Admin
exports.createDoor = asyncHandler(async (req, res, next) => {
  const { number, cards, manager } = req.body;

  // Create door from request
  const door = await Door.create({
    number,
    cards,
    manager,
  });

  res.status(200).json({
    success: true,
    data: door,
  });
});

// @desc      Gets doors managed by manager
// @route     GET /api/doors/me
// @access    Private/Manager
exports.getManagedDoors = asyncHandler(async (req, res, next) => {
  if (req.user.id) {
    // Find doors populate them with cards and populate cards with user info
    const foundDoors = await Door.find({ manager: req.user.id })
      .select('-__v -manager')
      .populate({
        path: 'cards',
        select: '-door -__v ',
        populate: {
          path: 'user',
          select: '-_id -role -__v -createdAt -email',
        },
      });

    if (foundDoors.length === 0) {
      return next(
        new ErrorResponse(
          `User ${req.user.name} doesn't manage any doors.`,
          404
        )
      );
    }

    // Wrap in data to simulate advancedResults
    // since they don't really work as expected for all get requests
    res.status(200).json({ success: true, data: foundDoors });
  } else {
    return next(new ErrorResponse(`Please make sure user.id is valid.`));
  }
});

// @desc      Get all doors
// @route     GET /api/doors
// @access    Private/Admin
exports.getDoors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
