const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing login endpoint...');
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('✅ Login Success!', response.data);
    } catch (error) {
        console.error('❌ Login Error:', error.response?.data || error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Backend server is not running!');
        }
    }
}

testLogin();
