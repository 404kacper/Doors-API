const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Test guest authentication
// @route     POST /api/doors/test/guest
// @access    Private
exports.testGuest = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});

// @desc      Test employee authentication
// @route     POST /api/doors/test/employee
// @access    Private
exports.testEmployee = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});

// @desc      Test guest authentication
// @route     POST /api/doors/test/admin
// @access    Private
exports.testAdmin = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
