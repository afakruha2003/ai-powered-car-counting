import cv2
import numpy as np


class FrameAnnotator:

    def __init__(
        self,
        line_color=(0, 255, 0),
        box_color=(255, 0, 0),
        id_color=(0, 255, 255),
        text_color=(0, 0, 255),
    ):
        self.line_color = line_color
        self.box_color = box_color
        self.id_color = id_color
        self.text_color = text_color

    def annotate(
        self,
        frame: np.ndarray,
        tracks: np.ndarray,
        line_y: int,
        up_count: int,
        down_count: int,
    ):
        h, w, _ = frame.shape

        cv2.line(frame, (0, line_y), (w, line_y), self.line_color, 2)

    
        for track in tracks:
            x1, y1, x2, y2, track_id = track.astype(int)
            cv2.rectangle(frame, (x1, y1), (x2, y2), self.box_color, 2)
            cv2.putText(
                frame,
                f"ID {int(track_id)}",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                self.id_color,
                2,
            )

        cv2.putText(
            frame,
            f"outcoming: {up_count}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            self.text_color,
            2,
        )
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
