const Prompt = require('../models/Prompt');
const aiService = require('../services/aiService');

exports.askAI = async (req, res) => {
  try {
    const { user_id, categoryName, subCategoryName, category_id, sub_category_id } = req.body;

    if (!user_id || !categoryName || !subCategoryName || !category_id || !sub_category_id) {
      return res.status(400).json({ message: 'כל השדות נדרשים' });
    }
    const aiResponse = await aiService.generateLearningContent(categoryName, subCategoryName);

    const newPrompt = new Prompt({
      user_id: user_id,
      category_id: category_id,
      sub_category_id: sub_category_id,
      prompt: `Explain ${subCategoryName} in ${categoryName}`,
      response: aiResponse
    });

    await newPrompt.save();

    res.status(200).json(newPrompt);
  } catch (error) {
    console.error("Prompt Error:", error);
    res.status(500).json({ message: "שגיאה בתהליך ה-AI", error: error.message });
  }
};

exports.getUserHistory = async (req, res) => {
  try {
    const prompts = await Prompt.find({ user_id: req.params.userId })
      .populate('category_id', 'name')
      .populate('sub_category_id', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ message: "שגיאה בשליפת היסטוריה", error: error.message });
  }
};