from pymongo import MongoClient
import os

# MongoDB URI setup 
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/travel_planner")

client = MongoClient(MONGO_URI)
db = client.travel_planner