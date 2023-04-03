const axios = require('axios');

// Set the API endpoint and token
const API_URL = 'https://api.openai.com/v1/engine/davinci-codex/completions';
const API_TOKEN = 'YOUR_API_KEY';

// Create a function to call the ChatGPT API
async function getChatGPTResponse(prompt) {
  try {
    // Make a POST request to the API endpoint
    const response = await axios.post(API_URL, {
      prompt,
      max_tokens: 60,
      temperature: 0.5,
      n: 1,
      stop: ['\n', 'User:', 'Bot:']
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    // Return the response from the API
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    return 'Sorry, something went wrong.';
  }
}

module.exports = { getChatGPTResponse };
