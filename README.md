# AI Powered Car Counting Systme

This backend runs on **Raspberry Pi 4** with a **USB camera**.  
It detects and counts cars in **real-time** using **YOLOv8 (n variant)** and provides a simple **REST API** for the Flutter mobile app.

---

## Hardware Requirements

- Raspberry Pi 4 (2GB+ recommended)
- USB Camera (e.g., Logitech C270 or similar)
- Power Supply (5V 3A for Pi 4)
- MicroSD card (32GB recommended)
- Internet connection (Ethernet or Wi-Fi)

---

## Software Requirements

- Raspberry Pi OS (Bullseye / Bookworm)
- Python 3.9+
- pip (Python package manager)
- Nodejs Express (for REST API)
- MongoDb (databse)
- OpenCV (camera access)
- Ultralytics YOLOv8 (object detection)

---

## Setup Instructions

1. Update Raspberry Pi packages

sudo apt update && sudo apt upgrade -y

2. Install Python and pip

sudo apt install python3 python3-pip -y

3. Install Git (if not installed)

sudo apt install git -y

```

4. Clone the backend project

git clone <your-repo-url>
cd backend_pi

# 5. Create a virtual environment
python3 -m venv venv

# 6. Activate the virtual environment
source venv/bin/activate

5. Install required Python libraries

pip3 install -r requirements.txt

6.Test your camera

Run this command to make sure the USB camera is detected:

ls /dev/video*

If you see something like `/dev/video0`, your camera is working.



7. Download YOLOv8 model

wget https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt
```

8. Run the backend server

python3 app.py

## API Endpoints

Health Check
GET http://<raspberry-ip>:5000/health
Returns `"ok"` if the server is running.

Get Total Car Count

GET http://<raspberry-ip>:5000/count
Returns a JSON response with the total number of cars detected.

Get Current Frame
http://<raspberry-ip>:5000/current_frame

Returns the current camera frame (JPEG) with detection boxes.

---

## How It Works

1. Raspberry Pi captures frames from the USB camera.
2. YOLOv8 detects cars in each frame.
3. SORT tracker assigns IDs to each car → prevents double counting.
4. Backend server updates the **total car count**.
5. Flutter app requests data via API and shows results in real-time.

---

## Notes

- Model used: `yolov8n.pt` (small, optimized for Pi 4).
- Make sure the Raspberry Pi and Flutter device are on the **same network**.
- Replace `<raspberry-ip>` with the actual IP address of your Raspberry Pi.
- To find Raspberry Pi IP:
  hostname -I

## File Structure (backend_pi)

```
backend_pi/
│── README.md                 # This file
│── app.py                    # Flask server
│── car_count_tracking.py     # YOLO + SORT counting
│── requirements.txt          # Python dependencies
│── yolov8n.pt                # YOLOv8 model
```
