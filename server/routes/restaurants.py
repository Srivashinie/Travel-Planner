import requests
from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

YELP_API_KEY = os.getenv("YELP_API_KEY")

if not YELP_API_KEY:
    raise ValueError("YELP_API_KEY is not set in the environment variables.")

YELP_API_URL = "https://api.yelp.com/v3/businesses/search"

# Create a Blueprint for restaurant routes
restaurants_bp = Blueprint('restaurants_bp', __name__)

# Define a dictionary for HTTP error codes 
ERROR_CODES = {
    400: "Invalid location",
    401: "Invalid API Key",
    403: "Forbidden access",
    404: "Resource not found",
    500: "Internal server error",
    502: "Bad gateway, try again later",
    503: "Service unavailable, please try again later",
    504: "Gateway timeout, please try again later"
}

def fetch_restaurants(location="New York", category="restaurants", price=""):
    headers = {"Authorization": f"Bearer {YELP_API_KEY}"}
    params = {
        "location": location,
        "term": category,
        "price": price if price else None,
        "limit": 10
    }
    
    try:
        response = requests.get(YELP_API_URL, headers=headers, params=params)
        
        if response.status_code in ERROR_CODES:
            return {"error": ERROR_CODES[response.status_code]}, response.status_code
        
        response.raise_for_status()  
        return response.json().get("businesses", []), 200 
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}, 500  

@restaurants_bp.route('/restaurants', methods=['GET'])
def get_restaurant_data():
    location = request.args.get('location', 'New York')  
    category = request.args.get('category', 'restaurants')  
    price = request.args.get('price', '')  
    result, status_code = fetch_restaurants(location, category, price)
    return jsonify(result), status_code