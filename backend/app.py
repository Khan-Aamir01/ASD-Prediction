from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import json
from config.db import init_db
from models.user import UserModel
from routes.userRoutes import user_routes, init_user_routes

app = Flask(__name__)
db = init_db(app)
CORS(app)

user_model = UserModel(db)
# ✅ Pass `db` to userRoutes before registering blueprint
init_user_routes(db)  
app.register_blueprint(user_routes, url_prefix="/api")


# Load the model
model = tf.keras.models.load_model('C:\\Users\\aamir\\OneDrive\\Desktop\\Aamir\\ASD\\backend\\autism_prediction_model.h5')
#model.summary()
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Autism Prediction API!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from request
        data = request.json
        print("The data from frontend is " + json.dumps(data))  # Corrected to print the data

        # Check if 'answers' is in the data and has 10 elements
        if 'answers' not in data or len(data['answers']) != 10:
            return jsonify({'error': 'Invalid input. Please provide 10 answers.'})

        
        answers = [0 if ans == 'Yes' else 1 for ans in data['answers']]

        
        #print('answer of conversion ',answers)

        # Convert to numpy array and reshape for prediction
        input_data = np.array(answers).reshape(1, -1)  # shape (1, 10)

        # Pad the input data to match the required shape (1, 102)
        input_data_padded = np.pad(input_data, ((0, 0), (0, 92)), 'constant')  # shape (1, 102)
        
        #print('the data of input' ,input_data)
        print("The data going to be used by the model: " + str(input_data_padded))

        # Make prediction with padded input
        prediction = model.predict(input_data_padded)
        #prediction = model.predict(input_data)
        print(prediction)
        
        # Return the prediction result
        return jsonify({'prediction': prediction.tolist()})

    except Exception as e:
        print('Exception occurred:', e)
        return jsonify({'error': str(e)})
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

