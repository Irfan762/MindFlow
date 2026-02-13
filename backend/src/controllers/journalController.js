const JournalEntry = require('../models/JournalEntry');
const { encrypt, decrypt } = require('../utils/encryption');

// Create Journal Entry
exports.createJournalEntry = async (req, res) => {
    try {
        const { title, content, tags, sentimentScore } = req.body;

        const encryptedContent = encrypt(content);

        const newEntry = new JournalEntry({
            user: req.user.id,
            title,
            content: encryptedContent,
            tags,
            sentimentScore
        });

        const entry = await newEntry.save();
        res.json(entry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get All Journal Entries
exports.getJournalEntries = async (req, res) => {
    try {
        const entries = await JournalEntry.find({ user: req.user.id }).sort({ date: -1 });
        
        const decryptedEntries = entries.map(entry => {
            const entryObj = entry.toObject();
            try {
                entryObj.content = decrypt(entry.content);
            } catch (e) {
                console.error("Decryption error", e);
                entryObj.content = "Error decrypting content";
            }
            return entryObj;
        });

        res.json(decryptedEntries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Journal Entry
exports.deleteJournalEntry = async (req, res) => {
    try {
        const entry = await JournalEntry.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({ msg: 'Entry not found' });
        }

        // Check user
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await entry.deleteOne();
        res.json({ msg: 'Entry removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Entry not found' });
        }
        res.status(500).send('Server Error');
    }
};
