const express = require("express");
const app = express();
app.use(express.json());

// GET route (no input)
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST route (process JSON input)
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  // Dummy data for now (replace with your actual logic)
  const userId = "john_doe_17091999"; // Modify based on your logic
  const email = "john@xyz.com";
  const rollNumber = "ABCD123";

  // Filter numbers and alphabets from the input array
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));

  // Find highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(
    (item) => item === item.toLowerCase()
  );
  const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || null;

  // File validation
  const fileValid = file_b64 ? true : false;
  const fileMimeType = fileValid ? "image/png" : null;
  const fileSizeKB = fileValid ? 400 : null; // Example size

  // Response
  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
