import threading

from video_stream import VideoStream
from yolo_detector import YoloVehicleDetector
from tracking import VehicleTracker
from line_counter import LineCounter
from frame_annotator import FrameAnnotator


class Detector:
    def __init__(self, model_path="yolov8n.pt"):
      
        self.stream = VideoStream()

        self.yolo = YoloVehicleDetector(model_path=model_path)

      
        self.tracker = VehicleTracker(
            max_age=20,
            min_hits=3,
            iou_threshold=0.3
        )

      
        self.counter = LineCounter(margin=10)

        self.annotator = FrameAnnotator()

        self.current_frame = None
        self.running = False

    def start(self):
        if self.running:
            return

        self.running = True
        thread = threading.Thread(
            target=self._process_frames,
            daemon=True
        )
        thread.start()

        print("[INFO] Detector thread started")

    def stop(self):
        self.running = False

        if self.stream is not None:
            self.stream.release()

        print("[INFO] Detector stopped")

    def _process_frames(self):
        while self.running:
            ret, frame = self.stream.read()
            if not ret or frame is None:
                continue

           
            detections = self.yolo.detect(frame)
           

        
            tracks = self.tracker.update(detections)
           

         
            h, w, _ = frame.shape
            line_y = h // 2

           
            self.counter.update(tracks, line_y)
            up_count, down_count = self.counter.get_direction_counts()

          
            annotated_frame = self.annotator.annotate(
                frame,
                tracks,
                line_y,
                up_count,
                down_count
            )

            self.current_frame = annotated_frame

    def get_direction_counts(self):
        return self.counter.get_direction_counts()

    def reset_counts(self):
        self.counter.reset()

    def get_current_frame_jpeg(self):
        if self.current_frame is None:
            return None

        import cv2
        ret, jpeg = cv2.imencode(".jpg", self.current_frame)
        if not ret:
            return None

        return jpeg.tobytes()
