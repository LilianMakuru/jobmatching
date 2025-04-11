const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(express.json());

// ✅ CORS Configuration - Ruhusu Requests Kutoka Frontend (127.0.0.1:5500)
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // Ruhusu zote
    credentials: true
}));


// ✅ Session Middleware (For User Authentication)
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Badilisha kuwa true kama unatumia HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 Day
    }
}));

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'job_matching'
});

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

// ✅ Middleware ya CORS Headers (Kama Additional Safety)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// ✅ REGISTER - User Signup
app.post('/register', async (req, res) => {
    const { fullname, national_id, email, password } = req.body;

    if (!fullname || !national_id || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error' });
        if (results.length > 0) return res.status(400).json({ success: false, message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO users (fullname, national_id, email, password) VALUES (?, ?, ?, ?)';
        
        db.query(insertQuery, [fullname, national_id, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Database error' });
            res.json({ success: true, message: 'User registered successfully' });
        });
    });
});

// ✅ LOGIN - User Authentication
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Server error' });
        if (results.length === 0) return res.status(401).json({ success: false, message: 'Invalid email or password' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        req.session.user = { id: user.id, fullname: user.fullname, email: user.email };
        res.json({ success: true, message: 'Login successful', user: req.session.user });
    });
});

// ✅ GET USER - Check Login Session
app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// ✅ LOGOUT - End User Session
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully' });
});

// ✅ JOB LISTINGS - Static Data for Testing
app.get('/jobs', (req, res) => {
    const jobs = [
        { title: 'Software Engineer', company: 'TechCorp', location: 'Dar es Salaam' },
        { title: 'Marketing Manager', company: 'BizConnect', location: 'Arusha' },
        { title: 'Data Analyst', company: 'DataPros', location: 'Dodoma' }
    ];
    res.json({ jobs });
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));