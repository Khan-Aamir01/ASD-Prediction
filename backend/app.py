from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy weights (randomly assigned for now)
weights = np.random.rand(10)

def predict_autism(answers):
    """Compute autism probability based on user answers."""
    score = np.dot(answers, weights) / np.sum(weights)  # Normalize score
    probability = round(score * 100, 2)  # Convert to percentage
    print(probability)
    return probability

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    answers = data.get("answers")
    print(answers)
    if not answers or len(answers) != 10:
        return jsonify({"error": "Provide exactly 10 answers (0 or 1)."}), 400

    probability = predict_autism(answers)
    return jsonify({"autism_probability": probability})

if __name__ == '__main__':
    app.run(debug=True)
