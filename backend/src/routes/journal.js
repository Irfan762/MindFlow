const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const auth = require('../middleware/auth');

// @route   POST api/journal
// @desc    Create journal entry
// @access  Private
router.post('/', auth, journalController.createJournalEntry);

// @route   GET api/journal
// @desc    Get user journal entries
// @access  Private
router.get('/', auth, journalController.getJournalEntries);

// @route   DELETE api/journal/:id
// @desc    Delete journal entry
// @access  Private
router.delete('/:id', auth, journalController.deleteJournalEntry);

module.exports = router;
