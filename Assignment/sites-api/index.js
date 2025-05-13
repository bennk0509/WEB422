const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
  res.json({
    message: "API Listening",
    term: "Summer 2025",
    student: "Your Full Name Here"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
