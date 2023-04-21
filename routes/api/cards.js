const express = require('express');
const router = express.Router();

const Card = require('../../models/Card');
const {
  createCard,
  getCards,
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
    advancedResults(Card, { path: 'door', select: 'number manager' }),
    getCards
  )
  .put(protect, authorize('admin'), assignCard);
router.route('/:id').put(protect, authorize('employee', 'admin'), manageStatus);

module.exports = router;
