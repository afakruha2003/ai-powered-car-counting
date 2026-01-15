# Allow duplicated OpenMP libraries (needed on some Raspberry Pi / Linux setups)
import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import time
import cv2  # Used for live preview window

# Import configuration parameters
from config import MODEL_PATH, VIDEO_SOURCE, TOTAL_SYNC_INTERVAL, FRAME_SYNC_INTERVAL, CAMERA_ID

# Import core system modules
from detector import Detector
from api_client import send_counts_to_backend, send_frame_to_backend


def main():
    """
    Main entry point for running the vehicle detection and counting system
    on Raspberry Pi in real-time mode.
    """
    print("[INFO] Starting Raspberry Pi client...")

    # Initialize and start the detector pipeline
    try:
        detector = Detector(model_path=MODEL_PATH, video_source=VIDEO_SOURCE)
        detector.start()
        print("[INFO] Detector started.")
    except Exception as e:
        print(f"[ERROR] Failed to initialize/start Detector: {e}")
        return

    # Timers for periodic backend synchronization
    last_counts_sync_time = 0.0
    last_frame_sync_time = 0.0

    try:
        while True:
            now = time.time()

            # 1) Periodic synchronization of vehicle counts
            if now - last_counts_sync_time >= TOTAL_SYNC_INTERVAL:
                up_count, down_count = detector.get_direction_counts()

                # Map directional counts to backend terminology
                incoming = down_count
                outgoing = up_count

                print(f"[LOCAL] Incoming={incoming}, Outgoing={outgoing}")

                # Send counts to backend API
                send_counts_to_backend(incoming, outgoing, camera_id=CAMERA_ID)
                last_counts_sync_time = now

            # 2) Frame synchronization for live monitoring
            if now - last_frame_sync_time >= FRAME_SYNC_INTERVAL:
                frame_jpeg = detector.get_current_frame_jpeg()
                if frame_jpeg:
                    send_frame_to_backend(frame_jpeg, camera_id=CAMERA_ID)
                last_frame_sync_time = now

            # 3) Live annotated video preview
            frame = detector.current_frame
            if frame is not None:
                cv2.imshow("Live Annotated Preview", frame)

            # Exit the application when 'q' is pressed
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            # Small delay to reduce CPU usage
            time.sleep(0.05)

    except KeyboardInterrupt:
        print("\n[INFO] Keyboard interrupt. Stopping client...")
    finally:
        # Clean shutdown of resources
        detector.stop()
        cv2.destroyAllWindows()
        print("[INFO] Detector stopped. Exiting.")


# Script execution entry point
if __name__ == "__main__":
    main()
