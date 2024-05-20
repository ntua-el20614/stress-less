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


exports.returnUserPreferences = async (req, res) => {
    try {
        const query = `
        -- Select query to return game sessions with feedback, the time played, and the game name,
-- including the name of the user and the calculated difference in stress levels with a sign,
-- excluding sessions where endTime is NULL or duration is less than 10 seconds
SELECT
    gs.sessionID,
    u.username,  -- Include the username in the selection
    gs.startTime,
    gs.endTime,
    TIMESTAMPDIFF(SECOND, gs.startTime, gs.endTime) AS duration_seconds, -- This calculates the duration of the game in seconds
    g.gameName,
    CONCAT(IF(f.stressLevelAfter - f.stressLevelBefore > 0, '+', ''), f.stressLevelAfter - f.stressLevelBefore) AS stressLevelChange
FROM
    game_sessions gs
JOIN
    users u ON gs.userID = u.userID  -- Join with the users table to get the username
JOIN
    games g ON gs.gameID = g.gameID
JOIN
    feedback f ON gs.sessionID = f.sessionID
WHERE
    gs.endTime IS NOT NULL AND
    TIMESTAMPDIFF(SECOND, gs.startTime, gs.endTime) >= 10
ORDER BY
    duration_seconds DESC;

        
        `;
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ message: 'Error fetching user preferences', error: error });
    }
}