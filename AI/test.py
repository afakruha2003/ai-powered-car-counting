import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import time

from detector import Detector
from api_client import send_total_to_backend, send_frame_to_backend


# === Local test configuration ===
VIDEO_SOURCE = "AI\\traffic_video.mp4"
  # use your local test video instead of camera
MODEL_PATH = "yolov8n.pt"

# make a different camera id for testing so backend can distinguish
TEST_CAMERA_ID = "local_test_cam"

# how often to send data during local testing (you can tweak these)
TOTAL_SYNC_INTERVAL = 3.0   # seconds between sending total
FRAME_SYNC_INTERVAL = 1.0   # seconds between sending frames


def main():
    print("[INFO] Starting LOCAL video test client...")

    # 1) Initialize detector with video file instead of camera
    try:
        detector = Detector(model_path=MODEL_PATH, video_source=VIDEO_SOURCE)
    except Exception as e:
        print(f"[ERROR] Failed to initialize Detector: {e}")
        return

    # 2) Start detector thread (YOLO + SORT + counting)
    try:
        detector.start()
        print(f"[INFO] Detector started. Reading from '{VIDEO_SOURCE}'")
    except Exception as e:
        print(f"[ERROR] Failed to start Detector: {e}")
        return

    last_total_sync_time = 0.0
    last_frame_sync_time = 0.0

    try:
        while True:
            now = time.time()

            # --- Send TOTAL car count periodically ---
            if now - last_total_sync_time >= TOTAL_SYNC_INTERVAL:
                total = detector.get_total()
                print(f"[LOCAL TEST] Current total cars = {total}")
                send_total_to_backend(total, camera_id=TEST_CAMERA_ID)
                last_total_sync_time = now

            # --- Send FRAME snapshot periodically ---
            if now - last_frame_sync_time >= FRAME_SYNC_INTERVAL:
                frame_jpeg = detector.get_current_frame_jpeg()
                if frame_jpeg is not None:
                    send_frame_to_backend(frame_jpeg, camera_id=TEST_CAMERA_ID)
                else:
                    print("[WARN] No frame yet from detector (still warming up?)")
                last_frame_sync_time = now

            # small sleep so we don't burn CPU
            time.sleep(0.1)

    except KeyboardInterrupt:
        print("\n[INFO] Keyboard interrupt. Stopping LOCAL test client...")
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
