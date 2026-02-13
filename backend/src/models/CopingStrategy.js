const mongoose = require('mongoose');

const copingStrategySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Breathing', 'Mindfulness', 'Crisis', 'Exercise', 'Affirmation']
    },
    description: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true // Can be text instructions or a URL
    },
    duration: {
        type: Number // in minutes
    },
    tags: [String],
    isPublic: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CopingStrategy', copingStrategySchema);
