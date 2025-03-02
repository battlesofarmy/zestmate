const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  embedding: [Number] // Store AI-generated vector
});

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;
