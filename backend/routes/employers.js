const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Route: POST /api/employer/post-job
router.post("/post-job", (req, res) => {
    const { employer_id, title, description, requirements, location } = req.body;

    if (!title || !description || !employer_id) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const sql = `
        INSERT INTO job_postings (employer_id, title, description, requirements, location)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [employer_id, title, description, requirements, location];

    db.run(sql, values, function (err) {
        if (err) {
            console.error("Error inserting job:", err);
            return res.status(500).json({ message: "Server error." });
        }

        res.status(201).json({ message: "Job posted successfully!", jobId: this.lastID });
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Route: POST /api/employer/post-job
router.post("/post-job", (req, res) => {
    const { employer_id, title, description, requirements, location } = req.body;

    if (!title || !description || !employer_id) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    const sql = `
        INSERT INTO job_postings (employer_id, title, description, requirements, location)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [employer_id, title, description, requirements, location];

    db.run(sql, values, function (err) {
        if (err) {
            console.error("Error inserting job:", err);
            return res.status(500).json({ message: "Server error." });
        }

        res.status(201).json({ message: "Job posted successfully!", jobId: this.lastID });
    });
});

module.exports = router;
