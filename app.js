const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
//const mongoSanitize = require("express-mongo-sanitize");
//const xss = require("xss-clean");
const morgan = require("morgan");
require("dotenv").config();
require("./cron/remainderJob");
const donationsRoutes = require("./routes/donationRoutes");

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:3000", "https://bloodlink.com"],
    credentials: true
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);

// Logger
app.use(morgan("dev"));

// Data Sanitization against XSS and NoSQL Injection
//app.use(xss());
//app.use(mongoSanitize({
    //allowDots: true, // <--- This fixes the TypeError issue
//}));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/donations", donationsRoutes);
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Welcome Route
app.get("/", (req, res) => {
    res.send("Welcome to BloodLink API!");
});

// Handle 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
