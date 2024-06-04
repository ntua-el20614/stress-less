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
