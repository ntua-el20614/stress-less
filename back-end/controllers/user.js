// controllers/user.js
const bcrypt = require('bcryptjs');
const { pool } = require('../utils/database');

exports.addUser = async (req, res, next) => {
    const { username, password } = req.body;
    
    try {
        // Hash the password with a salt round of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const [results] = await pool.query(query, [username, hashedPassword]);
        res.status(201).json({ message: 'User added successfully', userId: results.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
            return res.status(409).json({ message: 'User already exists' });
        }
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error adding user', error: error });
    }
};


exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [results] = await pool.query(query, [username]);
        const user = results[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'User logged in successfully', userId: user.userID });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error logging in user', error: error });
    }
};

//SELECT * FROM game_sessions WHERE userID = ?;
exports.getUserGameSessions = async (req, res) => {
    const { userID } = req.query;

    try {
        const query = 'SELECT * FROM game_sessions WHERE userID = ?';
        const [results] = await pool.query(query, [userID]);
        res.status(200).json(results);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error fetching game sessions', error: error });
    }
};


exports.returnPreference = async (req, res) => {
    const { userID } = req.query;
    try {
        const query = `SELECT gameName, 
        SUM(TIMESTAMPDIFF(SECOND, startTime, endTime)) AS totalSeconds,
        (SUM(TIMESTAMPDIFF(SECOND, startTime, endTime)) / 
        (SELECT SUM(TIMESTAMPDIFF(SECOND, startTime, endTime)) 
         FROM game_sessions WHERE userID = ?) * 100) AS percentage
 FROM game_sessions
 JOIN games ON game_sessions.gameID = games.gameID
 WHERE userID = ?
 GROUP BY gameName;
 `;
        const [results] = await pool.query(query, [userID,userID]);
        res.status(200).json(results);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error fetching preference', error: error });
    }
}


exports.changeTetrisHighscore = async (req, res) => {
    const { userID ,score } = req.params;

    
    try {
        const query = `
        UPDATE users SET tetris_score = '${score}' WHERE (userID = '${userID}');
        
        `;
        const [results] = await pool.query(query, [score]);
        res.status(200).json({ message: 'Highscore updated successfully' });
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error updating highscore', error: error });
    }
}
