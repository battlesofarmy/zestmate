require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const gemini = require('./gemini');

// Middlewares
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use('/chat',gemini);



app.get('/', (req, res) => {
    res.send("Hello World! This is Muntasir's World!");
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});