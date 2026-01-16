# 🚗 Smart Parking AI - Vehicle Counting System
> **FE401 - Multidisciplinary Integrated Project**
> A collaboration between Software Engineering and Electrical-Electronics Engineering students.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-Python%20|%20Node.js%20|%20React%20|%20Capacitor-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Project Objective

The goal of this project is to develop an integrated system that combines hardware system integration, computer vision, and full-stack software development to manage parking facilities efficiently.

* **Hardware (EEE):** A camera-based sensor system (Raspberry Pi) to capture video feeds.
* **AI (EEE/SENG):** A computer vision algorithm (YOLOv8 + SORT) to detect vehicles and count them based on direction (Incoming/Outgoing).
* **Software (SENG):** A backend API to handle data transmission and a mobile application to display real-time statistics, occupancy, and revenue reports.

---

## 👥 The Team

### Software Engineering Team

| Name | Surname | Student ID | Role |
|:---|:---|:---|:---|
| **Ruha** | **Kabbani** | 221504001 | AI & Computer Vision |
| **Şeymanur** | **Karakurt** | 221504002 | AI & Computer Vision |
| **Layan** | **Junaid** | 231504982 | AI & Computer Vision |
| **Damla** | **Zirek** | 221504022 | AI & Computer Vision |
| **Abdulhamid** | **El Mellah** | 232150494 | Backend / API & Database |
| **Coşkun** | **Sönmezoğlu** | 231504002 | Backend / API & Database |
| **Serken** | **Gür** | 231504001 | Backend / API & Database |
| **Ahmet** | **Hüseyin** | 231504889 | Mobile Frontend |
| **Hatice** | **Bircan** | 231504004 | Mobile Frontend |
| **Mehmet Can** | **Şahan** | 231504018 | Mobile Frontend |
| **Umut** | **Ücük** | 231504040 | Mobile Frontend |

### Electrical-Electronic Engineering Team

| Name | Surname | Student ID | Role |
|:---|:---|:---|:---|
| **Melih** | **İlbaylı** | 221502010 | Hardware (EEE) |

---

## 🏗 System Architecture

The system consists of three main modules working in synchronization:

1.  **Edge AI Module (Raspberry Pi):** Captures video, runs YOLOv8 detection, tracks vehicles using the SORT algorithm, counts line crossings, and sends JSON payloads to the Backend.
2.  **Backend Server:** A RESTful API that receives count data, calculates occupancy/revenue, manages authentication, and stores history in MongoDB.
3.  **Mobile Application:** A cross-platform app (iOS/Android) for parking owners to view live stats, camera status, and financial reports.

---

## 📱 Features

### AI Module (Edge)
* **AI Detection:** Uses **YOLOv8 (Nano)** for real-time vehicle recognition (Cars, Trucks, Buses, Motorcycles).
* **Smart Tracking:** Implements **SORT** (Simple Online and Realtime Tracking) to assign IDs to vehicles.
* **Directional Counting:** Uses virtual line crossing logic to distinguish between "Incoming" and "Outgoing" traffic to prevent double counting.
* **Live Preview:** Annotates video frames with bounding boxes and IDs for debugging.

### Mobile App (Frontend)
* **Admin Dashboard:** View real-time occupancy, revenue, and system health.
* **Live Monitor:** Real-time updates on cars entering/exiting.
* **Reporting:** Visual bar charts (Recharts) for hourly, daily, and weekly traffic trends.
* **Management:** Configure parking capacity and pricing per hour.
* **Cross-Platform:** Built with **Capacitor** to run natively on Android and iOS.

---

## 🛠️ Tech Stack

### 🧠 AI & Edge Computing (`/AI`)
* **Hardware:** Raspberry Pi 4/5, USB Camera
* **Language:** Python 3.9+
* **Libraries:** OpenCV, Ultralytics YOLOv8, PyTorch, NumPy, Requests

### 🔙 Backend API (`/Backend`)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Security:** JWT Authentication, Bcrypt, CORS

### 📱 Mobile Application (`/Frontend`)
* **Framework:** React (Vite), TypeScript
* **Mobile Wrapper:** Capacitor (Native iOS & Android runtime)
* **Styling:** Tailwind CSS, Shadcn/UI, Lucide React
* **Charts:** Recharts

---

## 🚀 Installation & Setup Guide

### 1. Backend Setup
The backend is required for the AI and Mobile App to function.

```bash
cd Backend
npm install
```

**Configuration (.env):**
Create a `.env` file in the Backend directory:

```env
PORT=8000
DB_CONN_STR=mongodb+srv://<your_connection_string>
JWT_SECRET=your_super_secret_key
ACCESS_TOKEN_SECRET=your_super_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Run:**
```bash
npm run dev_server
```

### 2. Mobile App Setup (Frontend)

```bash
cd Frontend
npm install
```

**Configuration (.env):**
Create a `.env` file in the Frontend directory to point to your backend:

```env
VITE_API_BASE_URL=http://localhost:8000
```

**Run Web Version:**
```bash
npm run dev
```

**Build for Mobile (iOS/Android):**
Build the React project and sync with Capacitor:

```bash
npm run build
npx cap add android
npx cap add ios
npm run cap:sync
```

**Open in IDE:**
```bash
npm run cap:open android  # Opens Android Studio
# OR
npm run cap:open ios      # Opens Xcode
```

### 3. AI Module Setup (Raspberry Pi / Laptop)
This runs the camera detection logic.
**Prerequisites:** Python 3.9+, USB Camera connected.

```bash
cd AI
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Configuration (config.py):**
Edit `AI/config.py` to set your backend URL.

```python
# If running locally on same network, use the backend's local IP
BASE_URL = "http://<BACKEND_IP>:8000/api" 
CAMERA_ID = "cam_1"
```

**Run:**
```bash
python run_on_raspberry.py
# Press 'q' to stop the program window
```

---

## 📂 Project Structure

```plaintext
ai-powered-car-counting/
├── AI/                     # Python Source for Computer Vision
│   ├── detector.py         # Main detection pipeline
│   ├── sort.py             # SORT Tracking algorithm
│   ├── yolo_detector.py    # YOLOv8 implementation
│   ├── line_counter.py     # Directional counting logic
│   ├── api_client.py       # HTTP client for Backend sync
│   └── run_on_raspberry.py # Entry point
├── Backend/                # Node.js Express Server
│   ├── controllers/        # Logic for API endpoints
│   ├── models/             # Mongoose Schemas (Garage, User, Stats)
│   ├── routes/             # API Routes
│   └── server.js           # Server entry point
└── Frontend/               # React Mobile App
    ├── src/
    │   ├── components/     # UI Components (Shadcn/UI based)
    │   ├── screens/        # App Screens (Dashboard, Login, Reports)
    │   ├── services/       # API integration
    │   └── hooks/          # Custom React hooks (useAuth, useGarage)
    ├── android/            # Android native project
    └── ios/                # iOS native project
```

## 📄 Deliverables Checklist

- [x] Camera Sensor Design (EEE)
- [x] AI Counting Algorithm (SENG/EEE)
- [x] Data Transmission to Cloud (EEE/SENG)
- [x] Mobile Application (SENG)
- [x] GitHub Repository with Documentation
- [x] Final Report

## 📜 License

This project is open-source and available under the MIT License.
