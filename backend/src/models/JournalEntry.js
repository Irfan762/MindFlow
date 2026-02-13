const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    sentimentScore: {
        type: Number
    },
    tags: [{
        type: String,
        trim: true
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
