const express = require("express");
const cors = require("cors"); require("dotenv").config();
const pool = require("./config/database");
const app = express();
const PORT = process.env.PORT || 5000;
const studentRoutes = require("./routes/studentRoutes");
app.use(cors()); app.use(express.json());
app.use("/api/students", studentRoutes);
app.get("/api/health", async (req, res) => { try { const [rows] = await pool.execute("SELECT 1");
    res.status(200).json({
        message: "Student Management API is running!",
        database: "Connected successfully"
    });
} catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({
        message: "Database connection failed"
    });
}
});
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });