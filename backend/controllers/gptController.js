const express = require('express');
const { getChatGPTResponse } = require('./chatgpt');

const app = express();

// Define a route to handle chat messages
app.post('/gpt', async (req, res) => {
  // Get the message prompt from the request body
  const { prompt } = req.body;
  // Call the ChatGPT API with the prompt
  const response = await getChatGPTResponse(prompt);
  // Send the response back to the client
  res.json({ response });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
