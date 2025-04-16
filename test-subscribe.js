// Test script for the subscribe endpoint
import fetch from 'node-fetch';

async function testSubscribe() {
  try {
    const response = await fetch('http://localhost:5000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: 'abhishek.das@gmail.com' })
    });
    
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error testing subscribe endpoint:', error);
  }
}

testSubscribe();