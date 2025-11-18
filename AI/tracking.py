from sort import Sort
import numpy as np


class VehicleTracker:
   
    def __init__(self, max_age=20, min_hits=3, iou_threshold=0.3):
        self.tracker = Sort(max_age=max_age, min_hits=min_hits, iou_threshold=iou_threshold)

    def update(self, detections: np.ndarray) -> np.ndarray:
        return self.tracker.update(detections)
