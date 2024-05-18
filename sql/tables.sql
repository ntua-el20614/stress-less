-- Drop the existing database if it exists and create a new one
DROP DATABASE IF EXISTS stress_less;
CREATE DATABASE stress_less;
USE stress_less;

-- Create a table for users with a unique username
CREATE TABLE users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

-- Create a table for games to store different types of games
CREATE TABLE games (
    gameID INT AUTO_INCREMENT PRIMARY KEY,
    gameName VARCHAR(255) UNIQUE
);

-- Populate the games table with initial game types
INSERT INTO games (gameName) VALUES ('Tetris'), ('Memory Game');

-- Create a table to track each game session by a user
CREATE TABLE game_sessions (
    sessionID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    gameID INT,
    startTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endTime TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (gameID) REFERENCES games(gameID)
);

-- Create a table to store user feedback after each game session
CREATE TABLE feedback ( 
    sessionID INT PRIMARY KEY,
    stressLevelBefore INT,
    stressLevelAfter INT,
    FOREIGN KEY (sessionID) REFERENCES game_sessions(sessionID)
);

-- Example of a trigger to automatically log the end time of a game session
DELIMITER $$
CREATE TRIGGER LogEndTime BEFORE UPDATE ON game_sessions
FOR EACH ROW
BEGIN
    IF NEW.endTime IS NULL THEN
        SET NEW.endTime = CURRENT_TIMESTAMP;
    END IF;
END$$
DELIMITER ;
