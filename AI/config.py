# Base URL of the backend server
# All API endpoints are built using this base address
BASE_URL = "https://ai-powered-car-counting.onrender.com/api"

# --------------------------------------------------
# Backend API endpoints
# --------------------------------------------------

# Endpoint used to send incoming and outgoing vehicle counts
COUNTER_COUNTS_ENDPOINT = f"{BASE_URL}/counter/update"

# Endpoint used to upload annotated video frames (optional)
FRAME_UPLOAD_ENDPOINT   = f"{BASE_URL}/video/frame"

# --------------------------------------------------
# Camera and model configuration
# --------------------------------------------------

# Unique identifier for the camera instance
CAMERA_ID = "cam_1"

# Path to the pre-trained YOLOv8 model file
MODEL_PATH = "yolov8n.pt"

# Video source index
# 0 refers to the default connected USB camera
VIDEO_SOURCE = 0  

# --------------------------------------------------
# Synchronization intervals (in seconds)
# --------------------------------------------------

# Time interval for sending vehicle count data to backend
TOTAL_SYNC_INTERVAL = 5.0

# Time interval for sending video frames to backend
FRAME_SYNC_INTERVAL = 1.0
