DROP DATABASE IF EXISTS stress_relief;

CREATE DATABASE stress_relief;
USE stress_relief;

CREATE TABLE users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    is_admin BOOLEAN DEFAULT FALSE,
    username VARCHAR(255) UNIQUE,
    approved BOOLEAN,
    password_hashed VARCHAR(255)
);
