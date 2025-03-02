require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const FAQ = require('./faqModel');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


// Chatbot API Call (using Hugging Face model)
async function getChatbotResponse(message) {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",  // Hugging Face model endpoint
            { inputs: message },
            { headers: { Authorization: `Bearer ${process.env.API}` } }  // Hugging Face API Key
        );
        return response.data.generated_text || "Sorry, I don't have an answer for that.";
    } catch (error) {
        console.error("Error calling Hugging Face API:", error);
        return "Error fetching response from AI.";
    }
}

// /chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        // Handle basic greetings or common phrases
        const simpleGreetings = ["hello", "hi", "hey", "good morning", "good afternoon"];
        if (simpleGreetings.includes(userMessage.toLowerCase().trim())) {
            return res.json({ response: "Hello! How can I assist you with university-related questions today?" });
        }

        // Check MongoDB for FAQs first
        const faqs = await FAQ.find({});
        if (!faqs || faqs.length === 0) {
            return res.json({ response: "No FAQ data found in the database. Please check the MongoDB connection." });
        }

        // If FAQ exists, check for matching question
        let bestMatch = null;
        let bestScore = -1;

        // (Optional) Here you can use a similarity comparison like cosine similarity to match FAQs
        // For simplicity, you can skip embeddings for a quick prototype

        for (let faq of faqs) {
            // You can adjust this to compare directly or use more sophisticated logic
            if (faq.question.toLowerCase().includes(userMessage.toLowerCase())) {
                bestMatch = faq;
                bestScore = 1;
                break;  // Stop once we find the best match
            }
        }

        // If a good match is found, return the answer from MongoDB FAQ
        if (bestMatch && bestScore > 0.75) {  // Adjust similarity threshold as needed
            return res.json({ response: bestMatch.answer });
        }

        // If no match found in MongoDB, use Hugging Face model for a general response
        const aiResponse = await getChatbotResponse(userMessage);
        return res.json({ response: aiResponse });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ response: "Error fetching response" });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
