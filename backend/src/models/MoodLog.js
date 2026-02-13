const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    moodScore: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    moodEmoji: {
        type: String,
        required: true
    },
    note: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MoodLog', moodLogSchema);
