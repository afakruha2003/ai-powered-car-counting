import numpy as np

class LineCounter:
  

    def __init__(self, margin: int = 10):
       
        self.margin = margin

  
        self.up_count = 0
        self.down_count = 0

      
        self.counted_ids = set()

    
        self.last_cy = {}

    def reset(self):
        self.up_count = 0
        self.down_count = 0
        self.counted_ids.clear()
        self.last_cy.clear()

    def update(self, tracks: np.ndarray, line_y: int) -> None:
     for track in tracks:
        x1, y1, x2, y2, track_id = track.astype(int)
        cy = int((y1 + y2) / 2)

        prev_cy = self.last_cy.get(track_id)
        self.last_cy[track_id] = cy

     
        if prev_cy is None:
            continue

    
        if prev_cy < line_y and cy >= line_y:
            key = ("down", int(track_id))
            if key not in self.counted_ids:
                self.down_count += 1
                self.counted_ids.add(key)

        # BOTTOM -> TOP (up)
        elif prev_cy > line_y and cy <= line_y:
            key = ("up", int(track_id))
            if key not in self.counted_ids:
                self.up_count += 1
                self.counted_ids.add(key)

    def get_direction_counts(self):
       
        return self.up_count, self.down_count
