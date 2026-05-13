const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const categoryRoutes = require('./routes/categoryRoutes'); 
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const userRoutes = require('./routes/userRoutes');
const promptRoutes = require('./routes/promptRoutes');

const app = express();

app.use(express.json()); 

app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/prompts', promptRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Success: Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Error: Could not connect to MongoDB:', err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});