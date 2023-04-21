const express = require('express');
const { createDoor, getDoors, getManagedDoors } = require('../../controllers/doors');
const router = express.Router();

const Door = require('../../models/Door');
const { protect, authorize } = require('../../middleware/auth');
const advancedResults = require('../../middleware/advancedResults');

router
  .route('/')
  .post(protect, authorize('admin'), createDoor)
  .get(
    protect,
    authorize('admin'),
    advancedResults(Door, { path: 'manager', select: 'name role' }),
    getDoors
  );

router
  .route('/me')
  .get(
    protect,
    authorize('employee', 'admin'),
    advancedResults(Door, { path: 'manager', select: 'name role' }),
    getManagedDoors
  );

module.exports = router;
