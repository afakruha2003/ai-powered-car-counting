import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

import time
import cv2
import numpy as np

from detector import Detector

VIDEO_SOURCE = "AI/traffic_video.mp4"   
MODEL_PATH = "yolov8n.pt"


def main():
    print("[INFO] Starting LOCAL video test client...")


    try:
        detector = Detector(model_path=MODEL_PATH, video_source=VIDEO_SOURCE)
    except Exception as e:
        print(f"[ERROR] Failed to initialize Detector: {e}")
        return

   
    try:
        detector.start()
        print(f"[INFO] Detector started. Reading from '{VIDEO_SOURCE}'")
    except Exception as e:
        print(f"[ERROR] Failed to start Detector: {e}")
        return

    
    last_up = -1
    last_down = -1

    try:
        while True:
          
            frame_jpeg = detector.get_current_frame_jpeg()
            if frame_jpeg is not None:
         
                np_arr = np.frombuffer(frame_jpeg, np.uint8)
                frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

                if frame is not None:
                    cv2.imshow("LOCAL TEST - Annotated Video", frame)

      
            up_count, down_count = detector.get_direction_counts()
            if up_count != last_up or down_count != last_down:
                print(f"[LOCAL TEST] Up={up_count}, Down={down_count}")
                last_up = up_count
                last_down = down_count

        
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                print("[INFO] 'q' pressed. Exiting LOCAL test...")
                break

            
            time.sleep(0.01)

    except KeyboardInterrupt:
        print("\n[INFO] Keyboard interrupt. Stopping LOCAL test client...")
    except Exception as e:
        print(f"[ERROR] Unexpected error in main loop: {e}")
    finally:
        try:
            detector.stop()
        except Exception:
            pass
        cv2.destroyAllWindows()
        print("[INFO] Detector stopped. Exiting.")


if __name__ == "__main__":
    main()
