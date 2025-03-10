require('dotenv').config();
const express = require('express');
const router = express.Router();
const genarateChats = require('./utils/gemini_response');
const mongoose = require('mongoose');
const uri = process.env.URI;
const ReqModel = require('./schemas/requestSchemaModel');

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

// Gemini API key

const apiKey = [
    process.env.API_1,
    process.env.API_2,
    process.env.API_3,
    process.env.API_4,
    process.env.API_5,
]


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};



mongoose.connect(uri)
.then(()=> console.log("MongoDb Conneted Successfully"))
.catch((err)=> console.log("Connection Error on mongodb"))


router.get('/show', async(req, res)=> {
  const result = await ReqModel.find({}, {_id: 0});
    res.send(result);
})

router.delete('/show', async(req, res)=> {
  const result = await ReqModel.deletemany({});
    res.send(result);
})

router.post('/', async (req, res) => {
  try {
    const { input } = req.body;

    await ReqModel({message: input}).save();
    // console.log(input)
    

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }


    const math = Math.floor(Math.random()*5);

    // const genAI = new GoogleGenerativeAI(apiKey[math]);
    const genAI = new GoogleGenerativeAI(apiKey[math], { forceNewConnection: true });


    const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Or the model you want to use
    });
    

    // Generate Output Chats
    const parts = genarateChats(input);
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    const generatedText = result.response.text();
    res.json({ output: generatedText }); // Send the generated text as a JSON response
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "The Server is busy for high trafic. Try few minutes lather" });
  }
});

module.exports = router;