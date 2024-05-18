// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

// Route to add a new user
router.post('/add', userController.addUser);
router.get('/gamesessions', userController.getUserGameSessions);
router.get('/preference', userController.returnPreference);

module.exports = router;
