const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes.js");
const connectDB = require("./config/db.js");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

connectDB();

app.use("/api/courses", courseRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
