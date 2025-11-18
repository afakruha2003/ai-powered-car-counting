# config.py

BASE_URL = "https://ai-powered-car-counting.onrender.com/api"

COUNTER_TOTAL_ENDPOINT = f"{BASE_URL}/counter/increment"
FRAME_UPLOAD_ENDPOINT   = f"{BASE_URL}/video/frame"

CAMERA_ID = "cam_1"
MODEL_PATH = "yolov8n.pt"
VIDEO_SOURCE = 0  # default camera index

TOTAL_SYNC_INTERVAL = 5.0
FRAME_SYNC_INTERVAL = 1.0
