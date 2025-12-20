import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
import time
from config import (
    MODEL_PATH,
    TOTAL_SYNC_INTERVAL,
    FRAME_SYNC_INTERVAL,
    CAMERA_ID,
)
from detector import Detector
from api_client import send_counts_to_backend, send_frame_to_backend


def main():
    print("[INFO] Starting Raspberry Pi client...")

    try:
        detector = Detector(model_path=MODEL_PATH)
    except Exception as e:
        print(f"[ERROR] Failed to initialize Detector: {e}")
        return

    try:
        detector.start()
        print("[INFO] Detector started.")
    except Exception as e:
        print(f"[ERROR] Failed to start Detector: {e}")
        return

    last_counts_sync_time = 0.0
    last_frame_sync_time = 0.0

    try:
        while True:
            now = time.time()

      
            if now - last_counts_sync_time >= TOTAL_SYNC_INTERVAL:
                up_count, down_count = detector.get_direction_counts()

                incoming = down_count
                outgoing = up_count

                print(f"[LOCAL] Incoming={incoming}, Outgoing={outgoing}")
                send_counts_to_backend(
                    incoming,
                    outgoing,
                    camera_id=CAMERA_ID
                )

                last_counts_sync_time = now

            if now - last_frame_sync_time >= FRAME_SYNC_INTERVAL:
                frame_jpeg = detector.get_current_frame_jpeg()
                send_frame_to_backend(
                    frame_jpeg,
                    camera_id=CAMERA_ID
                )

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
