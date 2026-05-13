const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// טעינת ההגדרות מקובץ ה-env
dotenv.config();

const app = express();

// חיבור למסד הנתונים בענן
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Success: Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('❌ Error: Could not connect to MongoDB:', err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});