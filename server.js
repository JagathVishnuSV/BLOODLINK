const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config();

//connectDB();
connectDB().catch(err => {
    console.error("Database connection error:", err);
});

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
});

app.set("io",io);
io.on("connection",(socket) => {
    console.log("User connected",socket.id);

    socket.on("register", (userId) => {
        socket.join(userId);
    })

    socket.on("disconnect",() => {
        console.log("User disconnected: ",socket.id);
    })
})
const PORT = process.env.PORT || 5001; // Change 5000 to 5001 or another free port
server.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});
