const { pool } = require('../utils/database');

//returnFeedback
exports.returnFeedback = async (req, res) => {
    try {
        const query = `SELECT gameID, AVG(stressLevelBefore - stressLevelAfter) AS averageStressReduction FROM feedback
        JOIN game_sessions ON feedback.sessionID = game_sessions.sessionID
        GROUP BY gameID;
        `;
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error fetching feedback', error: error });
    }
}