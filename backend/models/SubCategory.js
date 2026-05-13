const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', // זה אומר ל-Mongoose שהשדה הזה מכיל ID של קטגוריה
    required: true 
  }
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);