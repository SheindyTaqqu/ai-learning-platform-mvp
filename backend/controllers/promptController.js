const Prompt = require('../models/Prompt');
const aiService = require('../services/aiService');

exports.askAI = async (req, res) => {
  try {
    const { user_id, categoryName, subCategoryName, category_id, sub_category_id } = req.body;

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