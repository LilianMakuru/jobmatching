const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if you have a different MySQL user
    password: "", // Change if you have a password
    database: "job_matching"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

module.exports = db;
