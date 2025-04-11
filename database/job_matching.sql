CREATE DATABASE job_matching;
USE job_matching;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    national_id VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS job_postings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employer_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    requirements TEXT,
    location TEXT,
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
