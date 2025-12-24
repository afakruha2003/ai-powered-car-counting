import cv2


class VideoStream:
    def __init__(self, source=0):
        self.cap = cv2.VideoCapture(source)

        if not self.cap.isOpened():
            print(f"[ERROR] Could not open video source: {source}")
        else:
            print(f"[INFO] Video source opened successfully: {source}")

    def read(self):
        if self.cap is None:
            return False, None
        return self.cap.read()

    def release(self):
        if self.cap is not None:
            self.cap.release()
