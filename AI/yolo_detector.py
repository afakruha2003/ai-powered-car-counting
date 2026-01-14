import numpy as np
from ultralytics import YOLO


class YoloVehicleDetector:
    """
    YOLO-based vehicle detection module.

    This class wraps the Ultralytics YOLOv8 model and provides
    a simplified interface for vehicle detection.
    The output format is standardized to be compatible with
    tracking and counting modules.
    """

    def __init__(self, model_path: str, vehicle_classes=None):
        """
        model_path      : Path to the YOLOv8 model weights
        vehicle_classes : List of class IDs to detect (vehicles only)
                          Default = [2, 3, 5, 7]
                          (car, motorcycle, bus, truck)
        """
        # Default vehicle classes if none provided
        if vehicle_classes is None:
            vehicle_classes = [2, 3, 5, 7]

        # Load YOLO model
        self.model = YOLO(model_path)

        # Store vehicle class IDs
        self.vehicle_classes = vehicle_classes

    def detect(self, frame) -> np.ndarray:
        """
        Performs vehicle detection on a single frame.

        Input:
        - frame : Image frame (numpy array)

        Output:
        - np.ndarray of shape (N, 5)
          Each row contains: [x1, y1, x2, y2, confidence]
        """
        # Run YOLO inference on the frame
        results = self.model(frame, classes=self.vehicle_classes)

        detections = []

        # Extract bounding boxes and confidence scores
        for result in results[0].boxes:
            x1, y1, x2, y2 = result.xyxy[0].cpu().numpy()
            conf = result.conf[0].cpu().numpy()
            detections.append([x1, y1, x2, y2, conf])

        # Return empty array if no vehicles detected
        if len(detections) == 0:
            return np.empty((0, 5))

        return np.array(detections)
