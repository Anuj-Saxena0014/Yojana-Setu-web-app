# 🇮🇳 Yojana Setu — AI Powered Government Scheme Finder

> **"Find Government Schemes Made For You"**
> An AI-powered full-stack MERN web application that helps Indian citizens discover government welfare schemes based on their eligibility profile in under **2 minutes**.

---

# ✨ Features

| Feature                        | Description                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------- |
| 🤖 AI Scheme Recommendation    | Uses Google Gemini AI to rank and recommend the most relevant government schemes  |
| 🔐 JWT Authentication          | Secure user registration and login with JWT authentication                        |
| ⭐ Favourite Schemes            | Save and manage favourite schemes with MongoDB persistence                        |
| 🔍 Smart Eligibility Filtering | Filter schemes based on age, gender, income, occupation, caste category and state |
| 🔎 Live Search                 | Search schemes instantly by name or description                                   |
| 📋 Detailed Scheme Cards       | Eligibility, benefits, ministry, official links and application details           |
| 📱 Fully Responsive            | Optimized for Desktop, Tablet and Mobile                                          |
| ⚡ Fast Performance             | Built using React + Vite for lightning-fast user experience                       |
| 🎨 Modern UI                   | Clean government-inspired interface with custom colour palette                    |
| ☁️ Cloud Deployment            | Frontend deployed on Vercel and Backend deployed on Render                        |

---

# 🚀 Live Demo

**Frontend:** [Yojana Setu Web App](https://yojana-setu-web-app.vercel.app/)

**Backend API:** [API Endpoint](https://yojana-setu-web-app.onrender.com/api)

---

# 🧱 Tech Stack

## Frontend

* React 18
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Context API
* Google Fonts

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* dotenv
* CORS

---

## AI Integration

* Google Gemini API

---

## Deployment

* Vercel
* Render
* MongoDB Atlas

---

# ✨ Core Functionalities

* User Registration & Login
* JWT Authentication
* AI-based Scheme Recommendation
* Government Scheme Search
* Eligibility Filtering
* Favourite Schemes
* Responsive Dashboard
* Protected Backend Routes
* MongoDB Data Persistence
* Secure REST APIs

---

# 📂 Project Structure

```text
yojana-setu
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── scripts
│   ├── utils
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# 🔌 REST API

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/profile  |

---

## Government Schemes

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/schemes        |
| GET    | /api/schemes/:id    |
| POST   | /api/schemes/filter |

---

## Favourite Schemes

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | /api/auth/favourites        |
| POST   | /api/auth/favourites/toggle |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Anuj-Saxena0014/Yojana-Setu-web-app.git

cd Yojana-Setu-web-app
```

---

## Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

---

## Environment Variables

Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## Run Backend

```bash
cd backend

npm run dev
```

---

## Run Frontend

```bash
cd frontend

npm run dev
```

---

# 🎨 UI Features

* Government-inspired UI
* Responsive Layout
* Hero Banner
* Smart Filtering
* Search Bar
* Favourite Button
* Animated Components
* Clean Cards
* Modern Typography
* Fast Loading Experience

---

# 🔒 Authentication Flow

1. Register Account
2. Login
3. Receive JWT Token
4. Store Token Securely
5. Access Protected APIs
6. Save Favourite Schemes
7. Persistent Login Session

---

# 📈 Future Improvements

* Email Verification
* Forgot Password
* Admin Dashboard
* Scheme Application Tracking
* AI Chatbot Assistant
* Multi-language Support
* Notification System
* Scheme Comparison
* User Profile Dashboard

---

# 🛡️ Disclaimer

This project is developed for educational purposes. Government scheme information is intended for demonstration only. Users should verify eligibility and application details through the official Government of India portals.

---

# 👨‍💻 Author

**Anuj Kumar Saxena**

* B.Tech Computer Science Student
* MERN Stack Developer
* LeetCode Enthusiast

GitHub:
https://github.com/Anuj-Saxena0014

---

## ⭐ If you like this project, consider giving it a star on GitHub!
