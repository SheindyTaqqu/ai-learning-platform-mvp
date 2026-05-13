const SubCategory = require('../models/SubCategory');

exports.createSubCategory = async (req, res) => {
  try {
    const sub = new SubCategory({
      name: req.body.name,
      category_id: req.body.category_id 
    });
    await sub.save();
    res.status(201).json(sub);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubsByCategory = async (req, res) => {
  try {
    const subs = await SubCategory.find({ category_id: req.params.categoryId });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};