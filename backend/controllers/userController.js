const User = require('../models/User');
const Prompt = require('../models/Prompt');

exports.createUser = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'שם וטלפון הם שדות חובה' });
    }
    if (!/^[0-9]{9,15}$/.test(phone)) {
      return res.status(400).json({ message: 'מספר טלפון לא תקין' });
    }

    const newUser = new User({ name, phone });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'שגיאה ביצירת משתמש', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsersWithPrompts = async (req, res) => {
  try {
    const users = await User.find();
    const usersWithPrompts = await Promise.all(
      users.map(async (user) => {
        const prompts = await Prompt.find({ user_id: user._id })
          .populate('category_id', 'name')
          .populate('sub_category_id', 'name')
          .sort({ createdAt: -1 });
        return { ...user.toObject(), prompts };
      })
    );
    res.json(usersWithPrompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};