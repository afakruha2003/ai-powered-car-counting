import numpy as np
from ultralytics import YOLO


class YoloVehicleDetector:
    """
    Wraps Ultralytics YOLO and returns detections in the format:
    np.ndarray of shape (N, 5) => [x1, y1, x2, y2, score]
    """
    def __init__(self, model_path: str, vehicle_classes=None):
        if vehicle_classes is None:
            vehicle_classes = [2, 3, 5, 7]  # car, motorcycle, bus, truck
        self.model = YOLO(model_path)
        self.vehicle_classes = vehicle_classes

    def detect(self, frame) -> np.ndarray:
        results = self.model(frame, classes=self.vehicle_classes)

        detections = []
        for result in results[0].boxes:
            x1, y1, x2, y2 = result.xyxy[0].cpu().numpy()
            conf = result.conf[0].cpu().numpy()
            detections.append([x1, y1, x2, y2, conf])

        if len(detections) == 0:
            return np.empty((0, 5))

        return np.array(detections)
