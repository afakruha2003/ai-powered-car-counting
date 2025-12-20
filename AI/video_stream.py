from picamera2 import Picamera2


class VideoStream:
    def __init__(self, width=640, height=480):
        self.picam2 = Picamera2()
        config = self.picam2.create_video_configuration(
            main={"size": (width, height), "format": "RGB888"}
        )
        self.picam2.configure(config)
        self.picam2.start()

        print("[INFO] Raspberry Pi Camera (OV5647) started")

    def read(self):
        frame = self.picam2.capture_array()
        return True, frame

    def release(self):
        self.picam2.stop()
        print("[INFO] Camera stopped")
