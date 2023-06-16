const express = require('express');
const router = express.Router();

const Card = require('../../models/Card');
const {
  createCard,
  getCards,
  getUserCards,
  assignCard,
  manageStatus,
} = require('../../controllers/cards');

const { protect, authorize } = require('../../middleware/auth');
const advancedResults = require('../../middleware/advancedResults');

router
  .route('/')
  .post(protect, authorize('employee', 'admin'), createCard)
  .get(
    protect,
    authorize('admin'),
    advancedResults(Card, {
      path: 'door user',
      select: 'number manager name -_id',
    }),
    getCards
  )
  .put(protect, authorize('admin'), assignCard);

router.route('/me').get(
  protect,
  authorize('guest', 'employee', 'admin'),
  advancedResults(Card, {
    path: ['door', 'manager'],
    select: '-_id -cards -createdAt -__v',
    exclude: '_id __v',
    // Nested populate for manager
    populate: {
      path: 'manager',
      select: 'name email -_id',
    },
  }),
  getUserCards
);

router.route('/:id').put(protect, authorize('employee', 'admin'), manageStatus);

module.exports = router;
