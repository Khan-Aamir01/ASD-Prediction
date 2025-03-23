# db.py - MongoDB Connection
from flask_pymongo import PyMongo

def init_db(app):
    app.config["MONGO_URI"] = "mongodb://localhost:27017/ASD_db"  # Replace with your MongoDB URI
    mongo = PyMongo(app)
    return mongo.db  # Return the database instance