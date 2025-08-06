// Simple test script to verify backend endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testBackend() {
  try {
    console.log('Testing backend endpoints...');
    
    // Test server is running
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Server is running:', response.data);
    
    // Test user registration
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/users/register`, registerData);
      console.log('✅ Registration successful:', registerResponse.data);
    } catch (error) {
      console.log('⚠️ Registration failed (might be existing user):', error.response?.data?.message);
    }
    
    // Test login
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    try {
      const loginResponse = await axios.post(`${BASE_URL}/users/login`, loginData);
      console.log('✅ Login successful:', loginResponse.data);
      
      // Test get user with token
      const token = loginResponse.data.token;
      const userResponse = await axios.get(`${BASE_URL}/users/getUser`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Get user successful:', userResponse.data);
      
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data?.message);
    }
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
  }
}

testBackend(); 