const { HfInference } = require("@huggingface/inference");
require('dotenv').config();
const hf = new HfInference(process.env.API);

async function generateEmbedding(text) {
    const response = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: text
    });
    return response; // Returns an array of numbers (vector)
}

module.exports = generateEmbedding;
