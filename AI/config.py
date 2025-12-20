BASE_URL = "https://ai-powered-car-counting.onrender.com/api"

# Single endpoint that accepts both incoming/outgoing counts independently
COUNTER_COUNTS_ENDPOINT = f"{BASE_URL}/counter/update"
FRAME_UPLOAD_ENDPOINT   = f"{BASE_URL}/video/frame"

CAMERA_ID = "cam_1"
MODEL_PATH = "yolov8n.pt"


TOTAL_SYNC_INTERVAL = 5.0
FRAME_SYNC_INTERVAL = 1.0
