const axios = require('axios');

console.log('🔍 Testing Mental Wellness Platform Backend...\n');

async function runTests() {
    const baseURL = 'http://localhost:5000';
    
    // Test 1: Check if server is running
    console.log('1️⃣ Testing server connection...');
    try {
        const res = await axios.get(baseURL);
        console.log('✅ Server is running:', res.data);
    } catch (err) {
        console.error('❌ Server not responding:', err.message);
        return;
    }
    
    // Test 2: Try to register a new user
    console.log('\n2️⃣ Testing registration...');
    const newUser = {
        username: 'testuser' + Date.now(),
        email: 'test' + Date.now() + '@example.com',
        password: 'password123'
    };
    
    try {
        const res = await axios.post(`${baseURL}/api/auth/register`, newUser);
        console.log('✅ Registration successful!');
        console.log('Token received:', res.data.token ? 'Yes' : 'No');
        
        // Test 3: Try to login with the same user
        console.log('\n3️⃣ Testing login...');
        const loginRes = await axios.post(`${baseURL}/api/auth/login`, {
            email: newUser.email,
            password: newUser.password
        });
        console.log('✅ Login successful!');
        console.log('Token received:', loginRes.data.token ? 'Yes' : 'No');
        
        console.log('\n🎉 All tests passed! Backend is working correctly.');
        console.log('\n📋 Test credentials you can use:');
        console.log('   Email:', newUser.email);
        console.log('   Password:', newUser.password);
        
    } catch (err) {
        console.error('❌ Error:', err.response?.data || err.message);
        console.error('\n🔍 Error details:');
        console.error('   Status:', err.response?.status);
        console.error('   Message:', err.response?.data?.message || err.message);
    }
}

runTests();
