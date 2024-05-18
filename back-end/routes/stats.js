// routes/userRoutes.js
const express = require('express');
const statsController = require('../controllers/stats');
const router = express.Router();

// Route to add a new user
router.get('/feedback', statsController.returnFeedback);

module.exports = router;
