require('dotenv').config(); // Ensure dotenv loads first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const uri = process.env.URI;
const api = process.env.API;
const hf_api_key = process.env.API; // Store Hugging Face key in .env

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("Connection Error on MongoDB:", err.message));

// OpenAI Configuration (if using OpenAI instead)
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: api });

// Chatbot API - Hugging Face (Free Model)
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      { inputs: userMessage },
      { headers: { Authorization: `Bearer ${hf_api_key}` } } // Secure API Key
    );

    const botResponse = response.data.generated_text || "Sorry, I don’t have an answer for that.";
    res.json({ response: botResponse });

  } catch (error) {
    console.error("Error calling Hugging Face API:", error.response?.data || error.message);
    res.status(500).json({ response: "Error fetching response" });
  }
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
