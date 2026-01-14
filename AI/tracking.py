from sort import Sort
import numpy as np


class VehicleTracker:
    """
    Vehicle tracking wrapper based on the SORT algorithm.
    Responsible for assigning a unique and persistent ID
    to each detected vehicle across video frames.
    """

    def __init__(self, max_age=20, min_hits=3, iou_threshold=0.3):
        # Initialize SORT tracker with configurable parameters
        # max_age      : maximum frames to keep a track without detection
        # min_hits     : minimum detections before confirming a track
        # iou_threshold: threshold for matching detections to existing tracks
        self.tracker = Sort(
            max_age=max_age,
            min_hits=min_hits,
            iou_threshold=iou_threshold
        )

    def update(self, detections: np.ndarray) -> np.ndarray:
        """
        Updates tracker state using current frame detections.

        Input:
        - detections: array of bounding boxes from YOLO
                      [x1, y1, x2, y2, confidence]

        Output:
        - tracked objects with unique IDs
          [x1, y1, x2, y2, track_id]
        """
        return self.tracker.update(detections)
