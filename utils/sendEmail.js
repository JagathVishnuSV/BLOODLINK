const transporter = require("../config/mailer");

const sendEmail = async ({ to, bcc, subject, text, html}) => {
    const mailOptions = {
        from: `BloodLink <${process.env.EMAIL_USER}>`,
        to,
        bcc,
        subject,
        text,
        html
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
