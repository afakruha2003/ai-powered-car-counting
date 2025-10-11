from flask import Flask, Response, jsonify
from flask_cors import CORS
from car_count_tracking import Detector
import time

app = Flask(__name__)
CORS(app) 

DETECTOR = Detector(model_path="yolov8n.pt", video_source=0)
DETECTOR.start()

@app.route("/health")
def health():
   
    return jsonify({"status": "ok", "time": time.ctime()})

@app.route("/count")
def get_count():
  
    return jsonify({"total_cars": DETECTOR.get_total()})

@app.route("/reset_count", methods=["POST"])
def reset_count():
 
    DETECTOR.reset_count()
    return jsonify({"status": "reset done"})

@app.route("/current_frame")
def current_frame():
  
    frame = DETECTOR.get_current_frame_jpeg()
    if frame is None:
        return jsonify({"error": "No frame available"}), 500
    return Response(frame, mimetype="image/jpeg")

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000, debug=False)
