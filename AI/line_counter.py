import numpy as np


class LineCounter:
 
    def __init__(self, margin: int = 10):
        self.total_count = 0
        self.counted_ids = set()
        self.margin = margin

    def update(self, tracks: np.ndarray, line_y: int) -> int:
       
        for track in tracks:
            x1, y1, x2, y2, track_id = track.astype(int)
            cx = int((x1 + x2) / 2)
            cy = int((y1 + y2) / 2)

            if line_y - self.margin < cy < line_y + self.margin:
                if track_id not in self.counted_ids:
                    self.total_count += 1
                    self.counted_ids.add(track_id)

        return self.total_count

    def reset(self):
        self.total_count = 0
        self.counted_ids.clear()
