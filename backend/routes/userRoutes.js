const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const verifyAdmin = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'סיסמה שגויה' });
  }
  next();
};

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.get('/admin', verifyAdmin, userController.getAllUsersWithPrompts);

module.exports = router;