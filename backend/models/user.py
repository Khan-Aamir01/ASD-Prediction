# models.py - User Model
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

class UserModel:
    def __init__(self, db):
        self.collection = db.users

    def add_user(self, name, email, password, gender, dob, ethnicity):
        user_data = {
            "name": name,
            "email": email,
            "password": password,
            "gender": gender,
            "dob": dob,
            "ethnicity": ethnicity,
            "result": None  # ✅ Store only the latest ASD test result
        }
        return self.collection.insert_one(user_data).inserted_id

    def get_users(self):
        return list(self.collection.find({}, {"_id": 0}))  # Exclude _id field for simplicity

    def update_result(self, user_id, result):
        """ Updates the user's ASD prediction result (stores only the latest result). """
        result_data = {
            "result": result,  # ✅ Store the latest ASD prediction percentage
            "date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")  # ✅ Store the latest test date
        }

        return self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"result": result_data}}  # ✅ Overwrite previous result with the new one
        )
