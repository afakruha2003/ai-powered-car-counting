import cv2
import numpy as np


# --------------------------------------------------
# FrameAnnotator
# Responsible for drawing visual information on frames
# --------------------------------------------------
class FrameAnnotator:

    def __init__(
        self,
        line_color=(0, 255, 0),     # Counting line color (green)
        box_color=(255, 0, 0),      # Bounding box color (blue)
        id_color=(0, 255, 255),     # Tracking ID color (yellow)
        text_color=(0, 0, 255),     # Counter text color (red)
    ):
        # Store drawing colors
        self.line_color = line_color
        self.box_color = box_color
        self.id_color = id_color
        self.text_color = text_color

    # --------------------------------------------------
    # Annotates the frame with:
    # - Counting line
    # - Vehicle bounding boxes
    # - Tracking IDs
    # - Incoming / Outgoing counters
    # --------------------------------------------------
    def annotate(
        self,
        frame: np.ndarray,
        tracks: np.ndarray,
        line_y: int,
        up_count: int,
        down_count: int,
    ):
        # Get frame dimensions
        h, w, _ = frame.shape

        # Draw horizontal counting line
        cv2.line(frame, (0, line_y), (w, line_y), self.line_color, 2)

        # Draw bounding boxes and IDs for each tracked vehicle
        for track in tracks:
            x1, y1, x2, y2, track_id = track.astype(int)

            # Draw bounding box
            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                self.box_color,
                2
            )

            # Draw vehicle ID above bounding box
            cv2.putText(
                frame,
                f"ID {int(track_id)}",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                self.id_color,
                2,
            )

        # Display outgoing vehicle count
        cv2.putText(
            frame,
            f"outcoming: {up_count}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            self.text_color,
            2,
        )

        # Display incoming vehicle count
        cv2.putText(
            frame,
            f"incoming: {down_count}",
            (20, 80),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            self.text_color,
            2,
        )

        return frame
