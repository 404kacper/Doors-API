const express = require('express');
const router = express.Router();

// @route   GET api/doors
// @desc    Test route
// @accesss Public
router.get('/', (req, res) => res.send('Doors route'));

module.exports = router;
