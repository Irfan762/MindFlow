const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        console.log('📥 Register request received:', req.body);
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            console.log('❌ Missing fields:', { username: !!username, email: !!email, password: !!password });
            return res.status(400).json({ 
                message: 'Please provide username, email, and password' 
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            console.log('❌ User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        console.log('✅ User created successfully:', email);

        // Create JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                console.log('✅ Token generated for:', email);
                res.status(201).json({ token });
            }
        );
    } catch (err) {
        console.error('❌ Register error:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        console.log('📥 Login request received:', req.body);
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            console.log('❌ Missing fields:', { email: !!email, password: !!password });
            return res.status(400).json({ 
                message: 'Please provide email and password' 
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            console.log('❌ User not found:', email);
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('❌ Invalid password for:', email);
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        console.log('✅ Login successful for:', email);

        // Create JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                console.log('✅ Token generated for:', email);
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.error('❌ Login error:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get User (Projected for later use)
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
