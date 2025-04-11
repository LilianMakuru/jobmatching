const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Create the uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

// Upload route for CV and certificates
app.post("/upload-documents", upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "certificates", maxCount: 10 }
]), (req, res) => {
    const cvPath = req.files["cv"] ? `/uploads/${req.files["cv"][0].filename}` : null;
    const certificatePaths = req.files["certificates"]
        ? req.files["certificates"].map(file => `/uploads/${file.filename}`)
        : [];

    res.json({ cv: cvPath, certificates: certificatePaths });
});

// Dummy jobs API
app.get("/jobs", (req, res) => {
    const jobs = [
        {
            id: "1",
            title: "Software Developer",
            company: "Tech Corp",
            location: "Dar es Salaam"
        },
        {
            id: "2",
            title: "Marketing Specialist",
            company: "SmartMarket",
            location: "Dodoma"
        },
        {
            id: "3",
            title: "Data Analyst",
            company: "Insights Ltd.",
            location: "Arusha"
        }
    ];
    res.json({ jobs });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
