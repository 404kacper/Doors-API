const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const advancedResults = require('../middleware/advancedResults');
const Door = require('../models/Door');

// @desc      Create door
// @route     POST /api/doors
// @access    Private/Admin
exports.createDoor = asyncHandler(async (req, res, next) => {
  const { number , cards, manager} = req.body;

  // Create door from request
  const door = await Door.create({
    number,
    cards,
    manager
  });

  res.status(200).json({
    success: true,
    data: door
  });
});

// @desc      Gets doors managed by user
// @route     GET /api/doors/me
// @access    Private
exports.getManagedDoors = asyncHandler(async (req, res, next) => {
  const foundDoors = await Door.find({ manager: req.user.id });

  if (foundDoors.length === 0) {
    return next(new ErrorResponse(`User ${req.user.name} doesn't manage any doors.`, 404))
  }

  res.body = foundDoors;

  res.status(200).json(res.advancedResults);
});

// @desc      Get all doors
// @route     GET /api/doors
// @access    Private/Admin
exports.getDoors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
