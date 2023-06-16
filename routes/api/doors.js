const express = require('express');
const {
  createDoor,
  getDoors,
  getManagedDoors,
} = require('../../controllers/doors');
const router = express.Router();

const Door = require('../../models/Door');
const { protect, authorize } = require('../../middleware/auth');
const advancedResults = require('../../middleware/advancedResults');

router
  .route('/')
  .post(protect, authorize('admin'), createDoor)
  .get(
    protect,
    advancedResults(Door, {
      path: 'manager',
      select: '-_id name role',
      exclude: '__v createdAt _id cards',
    }),
    getDoors
  );

router
  .route('/me')
  .get(
    protect,
    authorize('employee', 'admin'),
    getManagedDoors
  );

module.exports = router;
