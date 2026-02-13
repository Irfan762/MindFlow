const axios = require('axios');

async function testRegistration() {
    try {
        console.log('Testing registration endpoint...');
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Success!', response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Backend server is not running!');
        }
    }
}

testRegistration();
