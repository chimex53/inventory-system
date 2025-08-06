// Test script for forgot password functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testForgotPassword() {
  try {
    console.log('Testing forgot password functionality...');
    
    // Test forgot password with valid email
    const forgotPasswordData = {
      email: 'test@example.com'
    };
    
    try {
      const response = await axios.post(`${BASE_URL}/users/forgotPassword`, forgotPasswordData);
      console.log('✅ Forgot password request successful:', response.data.message);
    } catch (error) {
      console.log('❌ Forgot password failed:', error.response?.data?.message);
    }
    
    // Test forgot password with invalid email
    const invalidEmailData = {
      email: 'nonexistent@example.com'
    };
    
    try {
      const response = await axios.post(`${BASE_URL}/users/forgotPassword`, invalidEmailData);
      console.log('✅ Forgot password with invalid email:', response.data.message);
    } catch (error) {
      console.log('✅ Correctly rejected invalid email:', error.response?.data?.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testForgotPassword(); 