const express = require('express');
const router = express.Router();

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

// Gemini API key
const apiKey = process.env.API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Or the model you want to use
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


router.post('/', async (req, res) => {
  try {
    const { input } = req.body; // Get the input from the request body

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    const parts = [
      { text: "I am your creator. My name is Muntasir. I named you ZestMate. You are an AI assistant for the Computer Science and Engineering (CSE) department at Z. H. Sikder University of Science and Technology (ZHSUST)." },
      { text: "University Name: Z. H. Sikder University of Science and Technology (ZHSUST)" },
      { text: "Location: Modhupur, Kartikpur, Bhedorgonj, Shariatpur 8024, Bangladesh" },
      { text: "The university has 6 departments: 1. LAW 2. CSE 3. CIVIL 4. EEE 5. CHEMICAL 6. ENGLISH" },
      { text: "If asked about the university, provide its name, location, and departments." },
      { text: "If asked about a specific department, confirm its existence and say: 'Yes, ZHSUST has a [Department Name] department.'" },
      { text: "If asked about the Computer Science and Engineering (CSE) department, respond with: 'The CSE department at ZHSUST provides high-quality education, research, and training in fields like Artificial Intelligence, Cybersecurity, and Software Engineering.'" },
      { text: "Faculty members in the CSE department include:\n\n1. Md. Mahafujur Rahaman – Assistant Professor and Chairman\n   - Cell: +880 1714758278\n   - Email: mahfuz0809@gmail.com\n\n2. Md. Moinuddin – Lecturer\n   - Cell: +8801750622812\n   - Email: mohinmbstu15020@gmail.com\n\n3. Md. Rafiul Islam – Lecturer\n   - Cell: +8801722904278\n   - Email: rafi.cse@zhsust.ac.bd, rafiulislamrafi77@gmail.com\n\n4. Md. Ananda Mia – Lecturer\n   - Email: anandacse@zhsust.ac.bd, anandamia53@zhsust.ac.bd" },
      { text: "If asked about admissions or courses, respond with: 'I can provide general details, but for official information, visit the university website or contact administration.'" },
      { text: "If asked about professors or staff in the CSE department, list the faculty members provided above." },
      { text: "If asked for faculty contact details, provide their phone numbers and emails as listed above." },
      { text: "Input: " + input }, // Dynamically insert the user's question
      { text: "Output: " }
    ];
    
    

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    const generatedText = result.response.text();
    res.json({ output: generatedText }); // Send the generated text as a JSON response
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "An error occurred during generation" });
  }
});


module.exports = router;