from pymongo import MongoClient
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

# Most of the controller logic is no required since routes already has it
class UserController:
    def __init__(self, db, secret_key):
        self.collection = db.users
        self.secret_key = secret_key  # Same as on Router 

    
    def get_user_by_email(self, email): # used by signup API to check email alredy exist
        return self.collection.find_one({"email": email})

    def add_user(self, name, email, password, gender, dob, ethnicity): # used by signup to add user info in db
        hashed_password = generate_password_hash(password)  
        user_data = {
            "name": name,
            "email": email,
            "password": hashed_password,
            "gender": gender,
            "dob": dob,
            "ethnicity": ethnicity,
            "result": None  
        }
        return str(self.collection.insert_one(user_data).inserted_id)

    def get_users(self): # no call
        return list(self.collection.find({}, {"_id": 0, "password": 0}))  # Exclude _id and password fields

    def get_user_by_id(self, user_id): # no call
        user = self.collection.find_one({"_id": ObjectId(user_id)}, {"_id": 0, "password": 0})
        return user if user else None

    def update_user(self, user_id, update_data): # no call
        if "password" in update_data:
            update_data["password"] = generate_password_hash(update_data["password"])
        result = self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        return result.modified_count > 0

    def delete_user(self, user_id): # no call
        result = self.collection.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0

    def login_user(self, email, password): # no call
        user = self.collection.find_one({"email": email})

        if not user or not check_password_hash(user["password"], password):
            return None, "Invalid email or password"

        # Generate JWT token
        payload = {
            "user_id": str(user["_id"]),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)  
        }
        token = jwt.encode(payload, self.secret_key, algorithm="HS256")

        return token, "Login successful"

    def update_result(self, user_id, result): # no call
        """ ✅ Updates the user's ASD prediction result (stores only the latest result). """
        result_data = {
            "result": result,  # ✅ Store the latest ASD prediction percentage
            "date": datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")  # ✅ Store the latest test date
        }

        return self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"result": result_data}}  # ✅ Overwrite previous result with the new one
        ).modified_count > 0  # Returns True if updated successfully
  