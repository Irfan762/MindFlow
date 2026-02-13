const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const auth = require('../middleware/auth');

// @route   POST api/mood
// @desc    Log mood
// @access  Private
router.post('/', auth, moodController.createMoodLog);

// @route   GET api/mood
// @desc    Get user mood logs
// @access  Private
router.get('/', auth, moodController.getMoodLogs);

// @route   DELETE api/mood/:id
// @desc    Delete mood log
// @access  Private
router.delete('/:id', auth, moodController.deleteMoodLog);

module.exports = router;
