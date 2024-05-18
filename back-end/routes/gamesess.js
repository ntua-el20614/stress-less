// routes/gamesess.js
const express = require('express');
const gamesessController = require('../controllers/gamesess');
const router = express.Router();

// Route to start a new game session
router.post('/start', gamesessController.startGameSession);
router.put('/end', gamesessController.endGameSession);

// Route to add feedback
router.post('/feedback', gamesessController.addFeedback);

module.exports = router;
