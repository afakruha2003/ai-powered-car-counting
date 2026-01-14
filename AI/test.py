# Allow duplicated OpenMP libraries (fixes some runtime issues on Linux / Pi)
import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import time
import cv2
import numpy as np

# Import the main detection pipeline
from detector import Detector

# Offline video source for local testing
VIDEO_SOURCE = "AI/traffic_video.mp4"
MODEL_PATH = "yolov8n.pt"


def main():
    """
    Local testing client for validating vehicle detection and counting
    using a recorded traffic video instead of a live camera.
    """
    print("[INFO] Starting LOCAL video test client...")

    # Initialize detector with offline video
    try:
        detector = Detector(model_path=MODEL_PATH, video_source=VIDEO_SOURCE)
    except Exception as e:
        print(f"[ERROR] Failed to initialize Detector: {e}")
        return

    # Start detection thread
    try:
        detector.start()
        print(f"[INFO] Detector started. Reading from '{VIDEO_SOURCE}'")
    except Exception as e:
        print(f"[ERROR] Failed to start Detector: {e}")
        return

    # Variables to track count changes
    last_up = -1
    last_down = -1

    try:
        while True:

            # Get latest annotated frame as JPEG
            frame_jpeg = detector.get_current_frame_jpeg()
            if frame_jpeg is not None:
                # Decode JPEG bytes to OpenCV frame
                np_arr = np.frombuffer(frame_jpeg, np.uint8)
                frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

                # Display annotated frame
                if frame is not None:
                    cv2.imshow("LOCAL TEST - Annotated Video", frame)

            # Read updated directional counts
            up_count, down_count = detector.get_direction_counts()

            # Print counts only when they change
            if up_count != last_up or down_count != last_down:
                print(f"[LOCAL TEST] Up={up_count}, Down={down_count}")
                last_up = up_count
                last_down = down_count

            # Exit when 'q' key is pressed
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                print("[INFO] 'q' pressed. Exiting LOCAL test...")
                break

            # Small delay to reduce CPU usage
            time.sleep(0.01)

    except KeyboardInterrupt:
        print("\n[INFO] Keyboard interrupt. Stopping LOCAL test client...")
    except Exception as e:
        print(f"[ERROR] Unexpected error in main loop: {e}")
    finally:
        # Safely stop detector and close windows
        try:
            detector.stop()
        except Exception:
            pass
        cv2.destroyAllWindows()
        print("[INFO] Detector stopped. Exiting.")


# Script execution entry point
if __name__ == "__main__":
    main()
