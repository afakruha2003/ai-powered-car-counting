import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import time
import requests

from detector import Detector



BASE_URL = "https://ai-powered-car-counting.onrender.com/api/"  

COUNTER_TOTAL_ENDPOINT = f"{BASE_URL}counter/increment"  


FRAME_UPLOAD_ENDPOINT = f"{BASE_URL}/video/frame"    



def send_total_to_backend(total: int, camera_id: str = "cam_1"):
 
    payload = {
        "cameraId": camera_id,
        "total": total,
    }

    try:
        response = requests.post(COUNTER_TOTAL_ENDPOINT, json=payload, timeout=5)
        response.raise_for_status()
        data = response.json()
        print(f"[API] Sent total={total}. Backend response: {data}")
    except Exception as e:
        print(f"[API ERROR] Failed to send total={total}: {e}")


def send_frame_to_backend(frame_jpeg_bytes: bytes, camera_id: str = "cam_1"):

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




def main():
    print("[INFO] Starting Raspberry Pi client...")

    model_path = "yolov8n.pt"  
    video_source = 0          

    try:
        detector = Detector(model_path=model_path, video_source=video_source)
    except Exception as e:
        print(f"[ERROR] Failed to initialize Detector: {e}")
        return


    try:
        detector.start()
        print("[INFO] Detector started.")
    except Exception as e:
        print(f"[ERROR] Failed to start Detector: {e}")
        return

    
    TOTAL_SYNC_INTERVAL = 5.0  
    FRAME_SYNC_INTERVAL = 1.0   

    last_total_sync_time = 0.0
    last_frame_sync_time = 0.0

    camera_id = "cam_1"

    try:
        while True:
            now = time.time()

           
            if now - last_total_sync_time >= TOTAL_SYNC_INTERVAL:
                total = detector.get_total()
                print(f"[LOCAL] Current total cars = {total}")
                send_total_to_backend(total, camera_id=camera_id)
                last_total_sync_time = now

           
            if now - last_frame_sync_time >= FRAME_SYNC_INTERVAL:
                frame_jpeg = detector.get_current_frame_jpeg()
                send_frame_to_backend(frame_jpeg, camera_id=camera_id)
                last_frame_sync_time = now

            
            time.sleep(0.1)

    except KeyboardInterrupt:
        print("\n[INFO] Keyboard interrupt. Stopping client...")
    except Exception as e:
        print(f"[ERROR] Unexpected error in main loop: {e}")
    finally:
      
        try:
            detector.stop()
        except Exception:
            pass
        print("[INFO] Detector stopped. Exiting.")


if __name__ == "__main__":
    main()
