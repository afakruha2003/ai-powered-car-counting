# AI Module – Intelligent Traffic Detection & Vehicle Counting

This module runs on **Raspberry Pi 4** with a **USB camera**.  
It performs **real-time vehicle detection, tracking, and directional counting** using **YOLOv8 (Nano variant)** and synchronizes results with the backend server via **REST APIs**.

---

## Hardware Requirements

- Raspberry Pi 5 (2GB+ recommended)
- USB Camera 
- Power Supply 
- MicroSD Card (32GB recommended)
- Internet connection (Ethernet or Wi-Fi)

---

## Software Requirements

- Raspberry Pi OS (Bullseye / Bookworm)
- Python 3.9+
- pip (Python package manager)
- OpenCV
- Ultralytics YOLOv8
- Torch / TorchVision
- NumPy
- Requests

---

## Setup Instructions

### 1. Update system packages

```
sudo apt update && sudo apt upgrade -y
```

### 2. Install Python and pip
```
sudo apt install python3 python3-pip -y
```

### 3. Install Git
```
sudo apt install git -y
```

### 4. Clone the project
```
git clone <your-repo-url>
cd AI
```

### 5. Create virtual environment
```
python3 -m venv venv
```

### 6. Activate virtual environment
```
source venv/bin/activate
```

### . Install dependencies
```
pip install -r requirements.txt
```

### Camera Test
```
ls /dev/video*
```


If /dev/video0 appears, the camera is detected correctly.

### Run the AI Module (Raspberry Pi)
```
python run_on_raspberry.py
```
Live annotated preview will appear

Press Q to stop execution

Vehicle counts are sent automatically to backend

---

## How It Works

Frames are captured from the USB camera or video source.

YOLOv8 detects vehicles in each frame.

SORT assigns a unique ID to every detected vehicle.

Vehicles crossing a virtual line are counted by direction.

Frames are annotated with boxes, IDs, and counters.

Incoming and outgoing counts are sent to the backend API.

---


## File Structure and Responsibilities
```
AI/
│
├── README.md
│   └─ Documentation for the AI module
│
├── run_on_raspberry.py
│   └─ Main entry point for Raspberry Pi
│      - Starts the detector
│      - Runs the processing loop
│      - Sends counts to backend
│      - Displays live annotated preview
│
├── config.py
│   └─ Central configuration file
│      - Model path
│      - Video source
│      - Backend API endpoints
│      - Camera ID
│      - Sync intervals
│
├── api_client.py
│   └─ Handles communication with backend server
│      - Sends incoming/outgoing vehicle counts
│      - Uploads annotated frames (optional)
│
├── detector.py
│   └─ Core AI pipeline controller
│      - Connects video stream, detector, tracker, counter, annotator
│      - Runs processing in a background thread
│      - Stores latest annotated frame
│
├── video_stream.py
│   └─ Camera and video input handler
│      - Opens USB camera or video file
│      - Reads frames safely
│      - Manages camera lifecycle
│
├── yolo_detector.py
│   └─ YOLOv8 inference wrapper
│      - Loads YOLOv8 model
│      - Filters vehicle classes (car, bus, truck, motorcycle)
│      - Outputs detections as bounding boxes with confidence
│
├── tracking.py
│   └─ Vehicle tracking module
│      - Wraps SORT tracker
│      - Assigns persistent IDs
│      - Prevents double counting
│
├── line_counter.py
│   └─ Direction-based counting logic
│      - Defines virtual counting line
│      - Detects crossing direction
│      - Updates incoming / outgoing counters
│
├── frame_annotator.py
│   └─ Visualization utility
│      - Draws bounding boxes
│      - Draws object IDs
│      - Draws counting line
│      - Displays counters on frame
│
├── sort.py
│   └─ SORT tracking algorithm implementation
│      - Kalman Filter based tracking
│      - IOU-based data association
│
├── requirements.txt
│   └─ Python dependencies required for the AI module
│
├── yolov8n.pt
│   └─ Pre-trained YOLOv8 Nano model
│      - Lightweight
│      - Optimized for Raspberry Pi
│
├── test.py
│   └─ Testing and debugging script
│
└── traffic_video.mp4
    └─ Sample traffic video for offline testing
```

## Notes

Model used: yolov8n.pt

Optimized for edge AI processing

Directional counting avoids duplicate counts

Backend synchronization is configurable

Camera and backend must be on the same network
