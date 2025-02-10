import requests
from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv

# Yelp API credentials
load_dotenv()

YELP_API_KEY = os.getenv("YELP_API_KEY")

if not YELP_API_KEY:
    raise ValueError("YELP_API_KEY is not set in the environment variables.")
YELP_API_URL = "https://api.yelp.com/v3/businesses/search"

# Create a Blueprint for restaurant routes
restaurants_bp = Blueprint('restaurants_bp', __name__)

@restaurants_bp.route('/restaurants', methods=['GET'])
def get_restaurant_data():
    """Fetch restaurant data based on location, category, and price from Yelp API."""
    location = request.args.get('location', 'New York')  
    category = request.args.get('category', 'restaurants')  
    price = request.args.get('price', '')  # Get price
    
    headers = {"Authorization": f"Bearer {YELP_API_KEY}"}
    params = {
        "location": location,
        "term": category,
        "price": price,  # Add price filter if present
        "limit": 10  # Limit to 10 results
    }

    response = requests.get(YELP_API_URL, headers=headers, params=params)

    if response.status_code == 200:
        return jsonify(response.json()["businesses"])
    else:
        return jsonify({"error": "Failed to fetch data"}), response.status_code