
import requests
from config import COUNTER_TOTAL_ENDPOINT, FRAME_UPLOAD_ENDPOINT, CAMERA_ID


def send_total_to_backend(total: int, camera_id: str = CAMERA_ID):
    url = f"{COUNTER_TOTAL_ENDPOINT}/{total}"

    try:
        response = requests.post(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        print(f"[API] Increment total by {total}. Backend response: {data}")
    except Exception as e:
        print(f"[API ERROR] Failed to send total={total}: {e}")


def send_frame_to_backend(frame_jpeg_bytes: bytes, camera_id: str = CAMERA_ID):
    if frame_jpeg_bytes is None:
        return

    files = {
        "frame": ("frame.jpg", frame_jpeg_bytes, "image/jpeg"),
    }
    data = {
        "cameraId": camera_id,
    }

    try:
        response = requests.post(FRAME_UPLOAD_ENDPOINT, data=data, files=files, timeout=5)
        response.raise_for_status()
        print(f"[API] Sent frame for camera={camera_id}. Status={response.status_code}")
    except Exception as e:
        print(f"[API ERROR] Failed to send frame: {e}")
