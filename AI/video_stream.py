import cv2


class VideoStream:
    """
    Video input handler.
    Responsible for opening the camera or video file
    and providing frames safely to the detection pipeline.
    """

    def __init__(self, source=0, show_preview=False):
        """
        source       : Camera index (0, 1, 2, ...) or video file path
        show_preview : If True, shows raw camera preview window
        """
        # Open video source (USB camera or video file)
        self.cap = cv2.VideoCapture(source)
        self.show_preview = show_preview

        # Check if video source opened correctly
        if not self.cap.isOpened():
            print(f"[ERROR] Could not open video source: {source}")
        else:
            print(f"[INFO] Video source opened successfully: {source}")

    def read(self):
        """
        Reads a single frame from the video source.

        Returns:
        - ret   : Boolean indicating success
        - frame : Captured video frame
        """
        if self.cap is None:
            return False, None

        # Read frame from camera or video
        ret, frame = self.cap.read()
        if not ret or frame is None:
            return ret, frame

        # Optional live preview for debugging
        if self.show_preview:
            cv2.imshow("Camera Preview", frame)

            # Press 'q' to stop preview and release camera
            if cv2.waitKey(1) & 0xFF == ord('q'):
                self.release()
                cv2.destroyAllWindows()
                exit(0)

        return ret, frame

    def release(self):
        """
        Releases the video capture device
        and closes any OpenCV windows.
        """
        if self.cap is not None:
            self.cap.release()

        if self.show_preview:
            cv2.destroyAllWindows()
