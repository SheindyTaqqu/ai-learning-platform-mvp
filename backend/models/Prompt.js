const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  sub_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  prompt: { type: String, required: true }, // השאלה של המשתמש
  response: { type: String, required: true }, // התשובה מה-AI
}, { timestamps: true }); // יוצר אוטומטית את שדה created_at שנדרש בהוראות

module.exports = mongoose.model('Prompt', PromptSchema);