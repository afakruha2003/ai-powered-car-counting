# detector.py

import cv2
import threading

from video_stream import VideoStream
from yolo_detector import YoloVehicleDetector
from tracking import VehicleTracker
from line_counter import LineCounter
from frame_annotator import FrameAnnotator


class Detector:
    """
    High-level orchestrator:
    - Reads frames from VideoStream
    - Runs YOLO via YoloVehicleDetector
    - Tracks via VehicleTracker (SORT)
    - Counts via LineCounter
    - Annotates via FrameAnnotator
    - Exposes: start(), stop(), get_total(), reset_count(), get_current_frame_jpeg()
    """
    def __init__(self, model_path="yolov8n.pt", video_source=0):
        self.stream = VideoStream(video_source)
        self.yolo = YoloVehicleDetector(model_path=model_path)
        self.tracker = VehicleTracker(max_age=20, min_hits=3, iou_threshold=0.3)
        self.counter = LineCounter(margin=10)
        self.annotator = FrameAnnotator()

        self.current_frame = None
        self.running = False

    # ===== Public API =====

    def start(self):
        self.running = True
        t = threading.Thread(target=self._process_frames, daemon=True)
        t.start()

    def stop(self):
        self.running = False
        self.stream.release()

    def get_total(self) -> int:
        return self.counter.total_count

    def reset_count(self):
        self.counter.reset()

    def get_current_frame_jpeg(self):
        if self.current_frame is None:
            return None
        ret, jpeg = cv2.imencode('.jpg', self.current_frame)
        if not ret:
            return None
        return jpeg.tobytes()

    # ===== Internal loop =====

    def _process_frames(self):
        while self.running:
            ret, frame = self.stream.read()
            if not ret or frame is None:
                continue

            # 1) detect
            detections = self.yolo.detect(frame)

            # 2) track
            tracks = self.tracker.update(detections)

            # 3) count
            h, w, _ = frame.shape
            line_y = h // 2
            total = self.counter.update(tracks, line_y)

            # 4) annotate
            annotated = self.annotator.annotate(frame, tracks, line_y, total)

            # 5) save latest frame
            self.current_frame = annotated
