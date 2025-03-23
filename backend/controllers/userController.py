from pymongo import MongoClient
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

class UserController:
    def __init__(self, db):
        self.collection = db.users
        self.secret_key = "your_secret_key"  # Ensure this is set for JWT token generation

    def add_user(self, name, email, password, gender, dob, ethnicity):
        hashed_password = generate_password_hash(password)  # Hash the password
        user_data = {
            "name": name,
            "email": email,
            "password": hashed_password,
            "gender": gender,
            "dob": dob,
            "ethnicity": ethnicity,
            "result": None  # ✅ Store only the latest ASD test result
        }
        return str(self.collection.insert_one(user_data).inserted_id)

    def get_users(self):
        return list(self.collection.find({}, {"_id": 0, "password": 0}))  # Exclude _id and password fields

    def get_user_by_id(self, user_id):
        user = self.collection.find_one({"_id": ObjectId(user_id)}, {"_id": 0, "password": 0})
        return user if user else None

    def update_user(self, user_id, update_data):
        if "password" in update_data:
            update_data["password"] = generate_password_hash(update_data["password"])
        result = self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        return result.modified_count > 0

    def delete_user(self, user_id):
        result = self.collection.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0

    def login_user(self, email, password):
        user = self.collection.find_one({"email": email})

        if not user or not check_password_hash(user["password"], password):
            return None, "Invalid email or password"

        # Generate JWT token
        payload = {
            "user_id": str(user["_id"]),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)  # Token expires in 2 hours
        }
        token = jwt.encode(payload, self.secret_key, algorithm="HS256")

        return token, "Login successful"

    def update_result(self, user_id, result):
        """ ✅ Updates the user's ASD prediction result (stores only the latest result). """
        result_data = {
            "result": result,  # ✅ Store the latest ASD prediction percentage
            "date": datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")  # ✅ Store the latest test date
        }

        return self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"result": result_data}}  # ✅ Overwrite previous result with the new one
        ).modified_count > 0  # Returns True if updated successfully
  