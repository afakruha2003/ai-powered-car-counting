import cv2
import numpy as np
from ultralytics import YOLO
from sort import Sort
import threading

class Detector:
    def __init__(self, model_path="yolov8n.pt", video_source=0):

        self.model = YOLO(model_path)

       
        self.cap = cv2.VideoCapture(video_source)

     
        self.tracker = Sort(max_age=20, min_hits=3, iou_threshold=0.3)

        self.total_count = 0
        self.counted_ids = set()

      
        self.current_frame = None

        self.running = False

    def start(self):
        self.running = True
        t = threading.Thread(target=self._process_frames)
        t.daemon = True
        t.start()

    def stop(self):
        self.running = False
        self.cap.release()

    def _process_frames(self):
        while self.running:
            ret, frame = self.cap.read()
            if not ret:
                continue

            results = self.model(frame, classes=[2, 3, 5, 7])  # car, motorcycle, bus, truck

            detections = []
            for result in results[0].boxes:
                x1, y1, x2, y2 = result.xyxy[0].cpu().numpy()
                detections.append([x1, y1, x2, y2, result.conf[0].cpu().numpy()])

            detections = np.array(detections)
            tracks = self.tracker.update(detections)

            h, w, _ = frame.shape
            line_y = h // 2
            cv2.line(frame, (0, line_y), (w, line_y), (0, 255, 0), 2)

            for track in tracks:
                x1, y1, x2, y2, track_id = track.astype(int)
                cx = int((x1 + x2) / 2)
                cy = int((y1 + y2) / 2)

                
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                cv2.putText(frame, f'ID {int(track_id)}', (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)

                
                if line_y - 10 < cy < line_y + 10:
                    if track_id not in self.counted_ids:
                        self.total_count += 1
                        self.counted_ids.add(track_id)

            
            cv2.putText(frame, f'Total Cars: {self.total_count}', (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

            self.current_frame = frame

    def get_total(self):
        return self.total_count

    def reset_count(self):
        self.total_count = 0
        self.counted_ids.clear()

    def get_current_frame_jpeg(self):
        if self.current_frame is None:
            return None
        ret, jpeg = cv2.imencode('.jpg', self.current_frame)
        return jpeg.tobytes()
