const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

router.post('/ask', promptController.askAI);
router.get('/user/:userId', promptController.getUserHistory);

module.exports = router;