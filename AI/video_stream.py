import cv2

class VideoStream:
    def __init__(self, source=0, show_preview=False):
        """
        source: Kamera indexi (0,1,2...) veya video dosyası
        show_preview: True ise kameradan gelen görüntüyü ekranda gösterir
        """
        self.cap = cv2.VideoCapture(source)
        self.show_preview = show_preview

        if not self.cap.isOpened():
            print(f"[ERROR] Could not open video source: {source}")
        else:
            print(f"[INFO] Video source opened successfully: {source}")

    def read(self):
        """
        Kameradan frame alır. Eğer show_preview True ise ekranda gösterir.
        """
        if self.cap is None:
            return False, None

        ret, frame = self.cap.read()
        if not ret or frame is None:
            return ret, frame

        if self.show_preview:
            cv2.imshow("Camera Preview", frame)
            # q tuşuna basınca pencereyi kapat
            if cv2.waitKey(1) & 0xFF == ord('q'):
                self.release()
                cv2.destroyAllWindows()
                exit(0)

        return ret, frame

    def release(self):
        """
        Kamerayı serbest bırakır
        """
        if self.cap is not None:
            self.cap.release()
        if self.show_preview:
            cv2.destroyAllWindows()
