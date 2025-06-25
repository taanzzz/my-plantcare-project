# 🌿 Plant Care Tracker

> *Plant Care Tracker* is a fully responsive and modern plant management web application built for plant lovers to efficiently track, manage, and nurture their green companions. This project delivers a nature-inspired user interface, personalized functionality, and secure user authentication for a smooth and enjoyable experience.

![Plant Care Tracker Preview](https://i.ibb.co/DfGxwbmw/Screenshot-2025-06-25-174854.png)


**Live Site:** [https://my-login-auth-67067.web.app/](https://my-login-auth-67067.web.app/)

**Plant Care Tracker** is a full-stack, mobile-responsive web application designed to help plant enthusiasts track and manage the care of their indoor and outdoor plants. With personalized dashboards, secure authentication, and a beautiful plant-themed UI, this app acts as a digital assistant for plant lovers.

---

## 💻 Instructions to Run the Project Locally

Follow these steps to set up and run both the client (frontend) and server (backend) locally on your machine.

### ✅ Prerequisites

- Node.js (v16.x or later)
- npm
- MongoDB (local or MongoDB Atlas)

---

### 📁 Step 1: Clone the Repositories

```bash
# Clone the client-side repository
git clone https://github.com/taanzzz/my-plantcare-project

# Clone the server-side repository
git https://github.com/taanzzz/simple-crud-server
```

---

### ⚙️ Step 2: Set up the Backend Server

```bash
cd <your-server-repository-name>
npm install
```

Create a `.env` file in the server root and add:

```env
PORT=5000
MONGODB_URI=<Your MongoDB Connection String>
```

---

### 🌐 Step 3: Set up the Frontend Client

```bash
cd simple-crud-server
npm install
```

Create a `.env.local` file in the root of the client and add:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_apiKey=AIzaSyDpB7UJMqEoUGKOefAgD0uw7moyktnfYsk
VITE_authDomain=my-assignment-project-2a864.firebaseapp.com
VITE_projectId=my-assignment-project-2a864
VITE_storageBucket=my-assignment-project-2a864.appspot.com
VITE_messagingSenderId=39798927892
VITE_appId=1:39798927892:web:5f24c3803edcebbeab6d01
```

---

### 🏃 Step 4: Run the Applications

Run the server first, then the client:

```bash
# Start the backend
npm start
# or for development
 npm run dev
```

```bash
# Start the frontend
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🚀 Features

### 🔐 Secure User Authentication

- Email/Password sign up and login
- Google social login
- Protected private routes with persistent sessions

### 🌱 Add & Manage Plants

- Add plants with details: species, watering frequency, notes, etc.
- Edit with pre-filled forms and update confirmation
- Delete with modal confirmation

### 📊 My Plants Dashboard

- View personal plant collection
- Sort and manage your plants with ease

### 📅 Care Scheduling

- Track watering and care schedule
- Sort by next watering date or care level

### 🌘 Theme Toggle

- Switch between dark and light mode

### 🎨 Responsive Design

- Fully optimized for mobile, tablet, and desktop

### 🔔 Styled Alerts & Notifications

- Feedback using Toastify and SweetAlert2
- No native browser alerts

### ⏳ Loading Indicators

- Animated spinner during async operations

### ❌ Custom 404 Page

- Styled 404 page for incorrect routes

---

## 🌿 Backend API Endpoints

### 🔎 GET `/`
- **Description:** Root check
- **Response:** `"🌱 Plant Care Tracker Server is Running!"`

---

### ➕ POST `/plants`
- **Description:** Add a new plant
- **Request Body:**
```json
{
  "name": "Money Plant",
  "species": "Epipremnum aureum",
  "wateringFrequency": "Every 7 days",
  "lastWatered": "2024-06-20",
  "userEmail": "user@example.com",
  "notes": "Loves bright, indirect light."
}
```

---

### 📥 GET `/plants`
- **Description:** Fetch all plants

### 📄 GET `/plants/:id`
- **Description:** Fetch a plant by ID

### 👤 GET `/my-plants/:email`
- **Description:** Fetch plants by user email

### ✏️ PUT `/plants/:id`
- **Description:** Update a plant entry
- **Request Example:**
```json
{
  "wateringFrequency": "Every 5 days",
  "notes": "Needs more frequent watering in summer."
}
```

### ❌ DELETE `/plants/:id`
- **Description:** Delete a plant by ID

> 🔐 Authentication is not enforced on routes for demo purposes, but highly recommended in production.

---

## 🧰 Tech Stack

### 💻 Frontend

- React.js
- Tailwind CSS
- DaisyUI
- React Router DOM
- Framer Motion
- React Tooltip
- AOS (Animate on Scroll)

### 🔧 Backend

- Node.js
- Express.js
- MongoDB (Native Driver)
- Cors
- Dotenv

### 🔐 Authentication & Hosting

- Firebase Authentication
- Firebase Hosting

### 📦 Other Libraries

- Lottie React
- Date-fns
- SweetAlert2
- React Toastify

---

## 🔑 Environment Variables

### 🔸 Frontend (`.env.local`)

```env
# Backend API
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id

```

### 🔸 Backend (`.env`)

```env
PORT=5000
MONGODB_URI=<Your MongoDB Connection String>
```

---

> 🪴 Happy Plant Tracking!
