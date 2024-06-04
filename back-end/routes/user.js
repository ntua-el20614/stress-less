// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

// Route to add a new user
router.post('/add', userController.addUser);
router.post('/login', userController.loginUser);
router.get('/gamesessions', userController.getUserGameSessions);
router.get('/preference', userController.returnPreference);
router.get('/tetris_highscore/:userID/:score', userController.changeTetrisHighscore);

module.exports = router;
