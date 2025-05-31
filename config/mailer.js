const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: false, // use STARTTLS, not SSL
    port: 587,
    connectionTimeout: 10000
});

module.exports = transporter;
