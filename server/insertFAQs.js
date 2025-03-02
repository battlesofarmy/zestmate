const mongoose = require('mongoose');
const FAQ = require('./faqModel');
const generateEmbedding = require('./generateEmbedding');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.URI);

async function insertFAQs() {
    const faqs = [
        { question: "What courses are available?", answer: "We offer Computer Science, Business, and Engineering courses." },
        { question: "How can I apply?", answer: "You can apply online through our admissions portal." }
    ];

    for (let faq of faqs) {
        faq.embedding = await generateEmbedding(faq.question);
        await FAQ.create(faq);
    }

    console.log("FAQs inserted with embeddings!");
    mongoose.disconnect();
}

insertFAQs();
