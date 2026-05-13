const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// כשמישהו עושה GET לכתובת הזו, ה-Controller יפעל
router.get('/', categoryController.getAllCategories);

// כשמישהו עושה POST (שולח נתונים), ה-Controller ייצור קטגוריה
router.post('/', categoryController.createCategory);

module.exports = router;