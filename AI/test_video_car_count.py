import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

from detector import Detector
import cv2
import numpy as np
import time

def main():
    print("[INFO] Test sistemi başlatılıyor...")

    # Model ve video kaynağı
    model_path = "yolov8n.pt"
    video_source = "traffic_video.mp4"  # Buraya kendi test video dosyanın yolunu yaz

    try:
        detector = Detector(model_path, video_source)
    except Exception as e:
        print(f"[HATA] Model yüklenemedi veya video açılamadı: {e}")
        return

    detector.start()
    print("[INFO] Araç tespiti başlatıldı. 'Q' tuşuna basarak çıkabilirsiniz.")

    prev_time = 0
    fps = 0

    while True:
        frame_bytes = detector.get_current_frame_jpeg()
        if frame_bytes:
            # Frame'i byte'dan OpenCV formatına çevir
            frame = cv2.imdecode(np.frombuffer(frame_bytes, np.uint8), cv2.IMREAD_COLOR)

            # FPS hesaplama
            curr_time = time.time()
            fps = 1 / (curr_time - prev_time) if prev_time else 0
            prev_time = curr_time

            # FPS ve toplam araç sayısını frame'e yaz
            cv2.putText(frame, f"FPS: {fps:.1f}", (20, 80),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 0), 2)
            

            cv2.imshow("Video ile Araç Tespiti ve Sayımı", frame)

        else:
            # Frame yoksa kısa bekle
            time.sleep(0.01)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            print("[INFO] Çıkış yapılıyor...")
            break
        elif key == ord('r'):
            print("[INFO] Sayaç sıfırlandı.")
            detector.reset_count()

    detector.stop()
    cv2.destroyAllWindows()
    print("[INFO] Test sistemi kapatıldı.")

if __name__ == "__main__":
    main()
