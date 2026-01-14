import numpy as np


# --------------------------------------------------
# LineCounter
# Handles direction-based vehicle counting
# --------------------------------------------------
class LineCounter:
  
    def __init__(self, margin: int = 10):
        # Margin around the counting line (tolerance area)
        self.margin = margin

        # Directional counters
        self.up_count = 0
        self.down_count = 0

        # Store counted vehicle IDs to prevent double counting
        self.counted_ids = set()

        # Store last center Y position for each tracked vehicle
        self.last_cy = {}

    # --------------------------------------------------
    # Reset all counters and stored tracking data
    # --------------------------------------------------
    def reset(self):
        self.up_count = 0
        self.down_count = 0
        self.counted_ids.clear()
        self.last_cy.clear()

    # --------------------------------------------------
    # Update counters based on tracked vehicle positions
    # --------------------------------------------------
    def update(self, tracks: np.ndarray, line_y: int) -> None:
        for track in tracks:
            x1, y1, x2, y2, track_id = track.astype(int)

            # Calculate vertical center of the bounding box
            cy = int((y1 + y2) / 2)

            # Get previous center position
            prev_cy = self.last_cy.get(track_id)

            # Update current center position
            self.last_cy[track_id] = cy

            # First appearance of this ID → direction cannot be determined
            if prev_cy is None:
                continue

            # ----------------------------------------------
            # Direction detection based on crossing the line
            # ----------------------------------------------

            # TOP → BOTTOM (incoming / down)
            if prev_cy < line_y and cy >= line_y:
                key = ("down", int(track_id))
                if key not in self.counted_ids:
                    self.down_count += 1
                    self.counted_ids.add(key)

            # BOTTOM → TOP (outgoing / up)
            elif prev_cy > line_y and cy <= line_y:
                key = ("up", int(track_id))
                if key not in self.counted_ids:
                    self.up_count += 1
                    self.counted_ids.add(key)

    # --------------------------------------------------
    # Return current directional counts
    # --------------------------------------------------
    def get_direction_counts(self):
        return self.up_count, self.down_count
