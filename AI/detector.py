import threading

from video_stream import VideoStream
from yolo_detector import YoloVehicleDetector
from tracking import VehicleTracker
from line_counter import LineCounter
from frame_annotator import FrameAnnotator


# --------------------------------------------------
# Detector class
# Acts as the main AI pipeline controller
# --------------------------------------------------
class Detector:
    
    def __init__(self, model_path="yolov8n.pt", video_source=0):
        # Initialize video input stream (USB camera or video file)
        self.stream = VideoStream(video_source)

        # Initialize YOLO vehicle detector
        self.yolo = YoloVehicleDetector(model_path=model_path)

        # Initialize SORT-based vehicle tracker
        self.tracker = VehicleTracker(
            max_age=20,
            min_hits=3,
            iou_threshold=0.3
        )

        # Initialize line-based directional counter
        self.counter = LineCounter(margin=10)

        # Initialize frame annotation utility
        self.annotator = FrameAnnotator()

        # Stores the latest annotated frame
        self.current_frame = None

        # Controls background processing thread
        self.running = False

    # --------------------------------------------------
    # Starts the frame processing loop in a background thread
    # --------------------------------------------------
    def start(self):
        if self.running:
            return

        self.running = True

        # Run processing loop in a separate daemon thread
        t = threading.Thread(
            target=self._process_frames,
            daemon=True
        )
        t.start()

    # --------------------------------------------------
    # Stops frame processing and releases camera resources
    # --------------------------------------------------
    def stop(self):
        self.running = False
      
        if self.stream is not None:
            self.stream.release()

    # --------------------------------------------------
    # Main processing loop:
    # - Reads frames from camera
    # - Detects vehicles using YOLO
    # - Tracks vehicles using SORT
    # - Counts line crossings by direction
    # - Annotates the frame
    # --------------------------------------------------
    def _process_frames(self):
        while self.running:
            # Read next frame from video stream
            ret, frame = self.stream.read()
            if not ret or frame is None:
                continue

            # 1) Detect vehicles in the current frame
            # Output format: (N, 5) => x1, y1, x2, y2, confidence
            detections = self.yolo.detect(frame)

            # 2) Track detected vehicles across frames
            # Output format: (N, 5) => x1, y1, x2, y2, track_id
            tracks = self.tracker.update(detections)

            # 3) Define counting line position (horizontal center of frame)
            h, w, _ = frame.shape
            line_y = h // 2

            # 4) Update directional vehicle counts
            self.counter.update(tracks, line_y)
            up_count, down_count = self.counter.get_direction_counts()

            # 5) Annotate frame with detections, IDs, line, and counters
            annotated = self.annotator.annotate(
                frame,
                tracks,
                line_y,
                up_count,
                down_count
            )

            # Store latest annotated frame for preview or backend upload
            self.current_frame = annotated

    # --------------------------------------------------
    # Returns current incoming / outgoing vehicle counts
    # --------------------------------------------------
    def get_direction_counts(self):
        return self.counter.get_direction_counts()

    # --------------------------------------------------
    # Resets vehicle counters
    # --------------------------------------------------
    def reset_counts(self):
        self.counter.reset()

    # --------------------------------------------------
    # Encodes the latest annotated frame as JPEG bytes
    # Used for optional backend frame upload
    # --------------------------------------------------
    def get_current_frame_jpeg(self):
        if self.current_frame is None:
            return None

        import cv2

        ret, jpeg = cv2.imencode('.jpg', self.current_frame)
        if not ret:
            return None

        return jpeg.tobytes()
