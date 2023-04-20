const express = require('express');
const {
  testGuest,
  testEmployee,
  testAdmin,
} = require('../../controllers/doors');
const router = express.Router();

const { protect, authorize } = require('../../middleware/auth');


router.get(
  '/test/guest',
  protect,
  authorize('guest', 'employee', 'admin'),
  testGuest
);
router.get(
  '/test/employee',
  protect,
  authorize('employee', 'admin'),
  testEmployee
);
router.get('/test/admin', protect, authorize('admin'), testAdmin);

module.exports = router;
