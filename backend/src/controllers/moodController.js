const MoodLog = require('../models/MoodLog');

// Create Mood Log
exports.createMoodLog = async (req, res) => {
    try {
        const { moodScore, moodEmoji, note } = req.body;

        const newMoodLog = new MoodLog({
            user: req.user.id,
            moodScore,
            moodEmoji,
            note
        });

        const moodLog = await newMoodLog.save();
        res.json(moodLog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get All Mood Logs for User
exports.getMoodLogs = async (req, res) => {
    try {
        const moodLogs = await MoodLog.find({ user: req.user.id }).sort({ date: -1 });
        res.json(moodLogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Mood Log
exports.deleteMoodLog = async (req, res) => {
    try {
        const moodLog = await MoodLog.findById(req.params.id);

        if (!moodLog) {
            return res.status(404).json({ msg: 'Mood Log not found' });
        }

        // Check user
        if (moodLog.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await moodLog.deleteOne();
        res.json({ msg: 'Mood Log removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Mood Log not found' });
        }
        res.status(500).send('Server Error');
    }
};
