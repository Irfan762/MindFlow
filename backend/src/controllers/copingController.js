const CopingStrategy = require('../models/CopingStrategy');

// Get All Strategies (Public + User's Own)
exports.getAllStrategies = async (req, res) => {
    try {
        const strategies = await CopingStrategy.find({
            $or: [
                { isPublic: true },
                { createdBy: req.user.id }
            ]
        }).sort({ category: 1 });
        res.json(strategies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create User Strategy
exports.createStrategy = async (req, res) => {
    try {
        const { title, category, description, content, duration, tags } = req.body;

        const newStrategy = new CopingStrategy({
            title,
            category,
            description,
            content,
            duration,
            tags,
            isPublic: false,
            createdBy: req.user.id
        });

        const strategy = await newStrategy.save();
        res.json(strategy);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete User Strategy
exports.deleteStrategy = async (req, res) => {
    try {
        const strategy = await CopingStrategy.findById(req.params.id);

        if (!strategy) {
            return res.status(404).json({ msg: 'Strategy not found' });
        }

        // Check user
        if (strategy.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await strategy.deleteOne();
        res.json({ msg: 'Strategy removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Strategy not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Seed Default Strategies (Ideally run as a script, but helpful for endpoint)
exports.seedStrategies = async (req, res) => {
    try {
        const count = await CopingStrategy.countDocuments({ isPublic: true });
        if (count > 0) return res.status(400).json({ msg: 'Strategies already seeded' });

        const defaultStrategies = [
            {
                title: 'Box Breathing',
                category: 'Breathing',
                description: 'A simple technique to reduce stress immediately.',
                content: 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold empty for 4 seconds.',
                duration: 5,
                tags: ['anxiety', 'stress', 'quick']
            },
            {
                title: '5-4-3-2-1 Grounding',
                category: 'Crisis',
                description: 'Use your senses to ground yourself in the present moment.',
                content: 'Acknowledge 5 things you verify, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
                duration: 5,
                tags: ['panic', 'grounding']
            },
             {
                title: 'Progressive Muscle Relaxation',
                category: 'Mindfulness',
                description: 'Relax your body by tensing and releasing muscle groups.',
                content: 'Start from your toes, tensing for 5 seconds and releasing for 10. move up to your head.',
                duration: 15,
                tags: ['sleep', 'relaxation']
            }
        ];

        await CopingStrategy.insertMany(defaultStrategies);
        res.json({ msg: 'Default strategies seeded' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
