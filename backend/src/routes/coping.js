const express = require('express');
const router = express.Router();
const copingController = require('../controllers/copingController');
const auth = require('../middleware/auth');

// @route   GET api/coping
// @desc    Get all strategies (public + user)
// @access  Private
router.get('/', auth, copingController.getAllStrategies);

// @route   POST api/coping
// @desc    Create user strategy
// @access  Private
router.post('/', auth, copingController.createStrategy);

// @route   DELETE api/coping/:id
// @desc    Delete user strategy
// @access  Private
router.delete('/:id', auth, copingController.deleteStrategy);

// @route   POST api/coping/seed
// @desc    Seed default strategies
// @access  Public (for initial setup) or Private
router.post('/seed', copingController.seedStrategies);

module.exports = router;
