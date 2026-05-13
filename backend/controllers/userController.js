const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      phone: req.body.phone
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "שגיאה ביצירת משתמש", error: error.message });
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