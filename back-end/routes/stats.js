// routes/userRoutes.js
const express = require('express');
const statsController = require('../controllers/stats');
const router = express.Router();

// Route to add a new user
router.get('/game_feedback', statsController.returnFeedback);
router.get('/feedback', statsController.returnUserPreferences);
module.exports = router;
