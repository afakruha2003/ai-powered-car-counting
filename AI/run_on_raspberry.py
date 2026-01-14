import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import time
from config import MODEL_PATH, VIDEO_SOURCE, TOTAL_SYNC_INTERVAL, FRAME_SYNC_INTERVAL, CAMERA_ID
from detector import Detector
from api_client import send_counts_to_backend, send_frame_to_backend
import cv2  # preview için

def main():
    print("[INFO] Starting Raspberry Pi client...")

    try:
        detector = Detector(model_path=MODEL_PATH, video_source=VIDEO_SOURCE)
        detector.start()
        print("[INFO] Detector started.")
    except Exception as e:
        print(f"[ERROR] Failed to initialize/start Detector: {e}")
        return

    last_counts_sync_time = 0.0
    last_frame_sync_time = 0.0

    try:
        while True:
            now = time.time()

            # 1) Direction counts
            if now - last_counts_sync_time >= TOTAL_SYNC_INTERVAL:
                up_count, down_count = detector.get_direction_counts()
                incoming = down_count
                outgoing = up_count
                print(f"[LOCAL] Incoming={incoming}, Outgoing={outgoing}")
                send_counts_to_backend(incoming, outgoing, camera_id=CAMERA_ID)
                last_counts_sync_time = now

            # 2) Frame sync
            # if now - last_frame_sync_time >= FRAME_SYNC_INTERVAL:
              #   frame_jpeg = detector.get_current_frame_jpeg()
                # send_frame_to_backend(frame_jpeg, camera_id=CAMERA_ID)
                # last_frame_sync_time = now

            # 3) Live preview (annotated frame)
            frame = detector.current_frame
            if frame is not None:
                cv2.imshow("Live Annotated Preview", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            time.sleep(0.05)

    except KeyboardInterrupt:
        print("\n[INFO] Keyboard interrupt. Stopping client...")
    finally:
        detector.stop()
        cv2.destroyAllWindows()
        print("[INFO] Detector stopped. Exiting.")

if __name__ == "__main__":
    main()
