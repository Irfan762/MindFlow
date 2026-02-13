const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');

// @route   POST api/ai/chat
// @desc    Chat with AI
// @access  Private
router.post('/chat', auth, aiController.chat);

// @route   POST api/ai/analyze
// @desc    Analyze sentiment
// @access  Private
router.post('/analyze', auth, aiController.analyze);

module.exports = router;
