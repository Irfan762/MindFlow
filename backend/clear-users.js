const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mental_wellness', {})
    .then(async () => {
        console.log('✅ MongoDB connected');
        
        // Drop the users collection
        try {
            await mongoose.connection.db.dropCollection('users');
            console.log('✅ Users collection cleared!');
            console.log('You can now register with any email address.');
        } catch (err) {
            if (err.message.includes('ns not found')) {
                console.log('ℹ️  Users collection was already empty.');
            } else {
                console.error('❌ Error:', err.message);
            }
        }
        
        mongoose.connection.close();
        console.log('✅ Database connection closed');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });
