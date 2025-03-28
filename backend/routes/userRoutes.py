import jwt
import datetime
from flask import Blueprint, request, jsonify
from controllers.userController import UserController
from werkzeug.security import check_password_hash
from bson import ObjectId  

SECRET_KEY = "GEAR5"  

user_routes = Blueprint("user_routes", __name__)
user_controller = None  

def init_user_routes(db):
    global user_controller
    user_controller = UserController(db,SECRET_KEY)

@user_routes.route("/users", methods=["POST"]) #for sign up
def add_user():
    data = request.get_json()
    required_fields = ["name", "email", "password", "gender", "dob", "ethnicity"]

    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if user already exists
    existing_user = user_controller.get_user_by_email(data["email"])
    if existing_user:
        return jsonify({"error": "User already exists. Please log in."}), 400

    # Create new user
    user_id = user_controller.add_user(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        gender=data["gender"],
        dob=data["dob"],
        ethnicity=data["ethnicity"]
    )

    return jsonify({"message": "User created successfully", "user_id": user_id}), 201

@user_routes.route("/login", methods=["POST"]) # for login and token generation
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Find user by email
    user = user_controller.collection.find_one({"email": email})

    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate JWT token
    token = jwt.encode(
        {"user_id": str(user["_id"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)},
        SECRET_KEY,
        algorithm="HS256"
    )

    # Return token with user details
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"],
            "gender": user.get("gender", "Not specified"),
            "dob": user.get("dob", "Not specified"),
            "ethnicity": user.get("ethnicity", "Not specified")
        }
    }), 200


@user_routes.route("/user", methods=["GET"]) # Use by Dashboard to display user info
def get_user():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        decoded_token = jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token["user_id"]
        user = user_controller.collection.find_one({"_id": ObjectId(user_id)}, {"password": 0})  # Exclude password

        if not user:
            return jsonify({"error": "User not found"}), 404

        user_data = {
            "name": user.get("name", ""),
            "email": user.get("email", ""),
            "gender": user.get("gender", ""),
            "dob": user.get("dob", ""),
            "ethnicity": user.get("ethnicity", ""),
            "result": user.get("result", None)  # ✅ Include latest ASD test result
        }

        return jsonify(user_data), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.DecodeError:
        return jsonify({"error": "Invalid token"}), 401

@user_routes.route("/users/me/result", methods=["PUT"]) # To Save Result in DB when submit Question
def save_test_result():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        decoded_token = jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token["user_id"]
        data = request.get_json()
        result = data.get("result")

        if result is None:
            return jsonify({"error": "Invalid result data"}), 400

        # ✅ Convert date to an ISO-formatted string before storing
        user_controller.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"result": {"score": result, "date": datetime.datetime.utcnow().isoformat()}}}
        )

        return jsonify({"message": "Test result saved successfully"}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.DecodeError:
        return jsonify({"error": "Invalid token"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# NO USE APIs
@user_routes.route("/users", methods=["GET"]) #No Use
def get_users():
    return jsonify(user_controller.get_users())

@user_routes.route("/users/<user_id>", methods=["PUT"]) #No Use
def update_user(user_id):
    data = request.json
    return jsonify({"updated": user_controller.update_user(user_id, data)})

@user_routes.route("/users/<user_id>", methods=["DELETE"]) #No Use
def delete_user(user_id):
    return jsonify({"deleted": user_controller.delete_user(user_id)})


@user_routes.route("/users/<user_id>/result", methods=["PUT"]) #No Use
def update_result(user_id):
    data = request.get_json()
    result = data.get("result")

    if result is None:
        return jsonify({"error": "Result is required"}), 400

    updated = user_controller.update_result(user_id, result)

    if updated:
        return jsonify({"message": "Result updated successfully"}), 200
    return jsonify({"error": "User not found or update failed"}), 404    