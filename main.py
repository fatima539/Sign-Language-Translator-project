from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "best_RESNET18_ASL.tflite")

if not os.path.exists(MODEL_PATH):
    logger.error("Model file not found at: %s", MODEL_PATH)
    raise FileNotFoundError(f"Model file not found at: {MODEL_PATH}")


interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

logger.info("🔹 Model Loaded Successfully")
logger.debug("INPUT DETAILS: %s", input_details)
logger.debug("OUTPUT DETAILS: %s", output_details)


labels = [chr(i) for i in range(65, 91)]  # A-Z

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "ASL Prediction API is running"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if not file.filename:
            return jsonify({"error": "No file selected"}), 400


        shape = input_details[0]['shape']  # [1, height, width, channels]
        height, width, channels = shape[1], shape[2], shape[3]


        try:
            image = Image.open(io.BytesIO(file.read()))
        except Exception as e:
            return jsonify({"error": "Invalid image file"}), 400


        if channels == 1:
            if image.mode != "L":
                image = image.convert("L")  # Convert to grayscale
        else:
            if image.mode != "RGB":
                image = image.convert("RGB")  # Convert to RGB

        
        image = image.resize((width, height))
        image_np = np.array(image, dtype=np.float32) / 255.0

        if channels == 1:
            image_np = np.expand_dims(image_np, axis=-1)

        image_np = np.expand_dims(image_np, axis=0)

        
        if image_np.shape != tuple(shape):
            return jsonify({"error": f"Invalid input shape: expected {shape}, got {image_np.shape}"}), 400

        
        interpreter.set_tensor(input_details[0]['index'], image_np)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])[0]


        pred_index = int(np.argmax(output_data))
        confidence = float(output_data[pred_index])

        predicted_label = labels[pred_index] if pred_index < len(labels) else f"Class {pred_index}"

        return jsonify({
            "prediction": predicted_label,
            "confidence": round(confidence * 100, 2)  
        })

    except Exception as e:
        logger.error(" Error during prediction: %s", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7000, debug=True)