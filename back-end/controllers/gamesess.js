// controllers/gamesessController.js
const { pool } = require('../utils/database');

exports.startGameSession = async (req, res) => {
    const { userID, gameID } = req.body;
    try {
        const query = 'INSERT INTO game_sessions (userID, gameID, startTime) VALUES (?, ?, CURRENT_TIMESTAMP)';
        const [results] = await pool.query(query, [userID, gameID]);
        res.status(201).json({ message: 'Game session started successfully', sessionID: results.insertId });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error starting game session', error: error });
    }
};

exports.endGameSession = async (req, res) => {
    const { sessionID } = req.body; 
    try {
        const query = 'UPDATE game_sessions SET endTime = CURRENT_TIMESTAMP WHERE sessionID = ?';
        await pool.query(query, [sessionID]);
        res.status(200).json({ message: 'Game session updated successfully' });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error updating game session', error: error });
    }
};



exports.addFeedback = async (req, res) => {
    const { sessionID, stressLevelBefore, stressLevelAfter } = req.body;
    try {
        const query = 'INSERT INTO feedback (sessionID, stressLevelBefore, stressLevelAfter) VALUES (?, ?, ?)';
        await pool.query(query, [sessionID, stressLevelBefore, stressLevelAfter]);
        res.status(201).json({ message: 'Feedback added successfully' });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error adding feedback', error: error });
    }
};
