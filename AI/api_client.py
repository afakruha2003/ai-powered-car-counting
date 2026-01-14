import requests
from config import COUNTER_COUNTS_ENDPOINT, FRAME_UPLOAD_ENDPOINT, CAMERA_ID

# --------------------------------------------------
# Sends vehicle count data (incoming / outgoing)
# from the Raspberry Pi client to the backend server
# --------------------------------------------------
def send_counts_to_backend(
    incoming_count: int,
    outgoing_count: int,
    camera_id: str = CAMERA_ID,
):
    # Prepare JSON payload containing camera ID
    # and directional vehicle counts
    payload = {
        "cameraId": camera_id,
        "incoming": incoming_count,  
        "outgoing": outgoing_count,  
    }

    try:
        # Send POST request to backend counter endpoint
        response = requests.post(
            COUNTER_COUNTS_ENDPOINT,
            json=payload,
            timeout=5
        )

        # Raise exception if HTTP status code indicates an error
        response.raise_for_status()

        # Parse backend response (for logging/debugging)
        data = response.json()
        print(
            f"[API] Sent counts incoming={incoming_count}, "
            f"outgoing={outgoing_count}. Backend response: {data}"
        )

    except Exception as e:
        # Handle network errors, timeouts, or backend failures
        print(
            f"[API ERROR] Failed to send counts "
            f"incoming={incoming_count}, outgoing={outgoing_count}: {e}"
        )


# --------------------------------------------------
# Sends the current annotated video frame to backend
# (optional functionality, used for monitoring/debug)
# --------------------------------------------------
def send_frame_to_backend(frame_jpeg_bytes: bytes, camera_id: str = CAMERA_ID):
    # If no frame is available, skip sending
    if frame_jpeg_bytes is None:
        print("[API WARN] No frame bytes to send.")
        return

    # Prepare multipart file payload for image upload
    files = {
        "frame": ("frame.jpg", frame_jpeg_bytes, "image/jpeg"),
    }

    # Additional form data (camera identifier)
    data = {
        "cameraId": camera_id,
    }

    try:
        # Send POST request to backend frame upload endpoint
        response = requests.post(
            FRAME_UPLOAD_ENDPOINT,
            data=data,
            files=files,
            timeout=5
        )

        # Raise exception if upload failed
        response.raise_for_status()

        print(
            f"[API] Sent frame for camera={camera_id}. "
            f"Status={response.status_code}"
        )

    except Exception as e:
        # Handle upload errors or connection issues
        print(f"[API ERROR] Failed to send frame: {e}")
