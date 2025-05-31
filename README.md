
# 🩸 BloodLink - Blood Donation Platform

BloodLink is a full-stack MERN (MongoDB, Express, React, Node.js) application built to streamline and simplify the process of blood donation. It connects donors and requesters through a secure, verified platform that includes OTP-based login, real-time request discovery, and secure communication.

## 🚀 Features

- 🔐 **OTP Email Verification** for secure login and user validation
- 📍 **Nearby Blood Requests** based on user location
- 👤 User-friendly donor and requester dashboards
- 📨 **Email Notifications** using Nodemailer
- 🌐 RESTful API backend with Express
- 📱 Responsive React frontend with modern UI
- ⚙️ Protected routes using JWT authentication
- 🛡️ Password encryption with bcrypt

## 🏗️ Project Structure

BloodLink/
├── client/ # React frontend
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/
│ │ └── App.tsx
├── server/ # Express backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ └── utils/


---

## 🧑‍💻 Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT, OTP with Nodemailer
- **Deployment:** (Add your deployment method - Heroku, Vercel, etc.)

---

## 🛠️ Installation

### Prerequisites

- Node.js and npm
- MongoDB Atlas or local MongoDB
- Gmail or SMTP credentials for sending OTPs

@@Setup

cd server
npm install

.env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

# Run Backend
cd server
npm run dev

# Run Frontend
cd bloodlink-frontend
npm start
