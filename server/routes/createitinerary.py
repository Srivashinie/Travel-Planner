from flask import Blueprint, request, jsonify
import requests
import os

place_search_bp = Blueprint('place_search', __name__)

YELP_API_KEY = os.getenv("YELP_API_KEY")

if not YELP_API_KEY:
    raise ValueError("YELP_API_KEY is not set in the environment variables.")

YELP_SEARCH_URL = "https://api.yelp.com/v3/businesses/search"

@place_search_bp.route('/search_places', methods=['GET'])
def search_places():
    query = request.args.get("query")  # Get the city/location input
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    headers = {
        "Authorization": f"Bearer {YELP_API_KEY}"
    }

    params = {
        "location": query,  
        "term": "tourist attractions",  
        "categories": "landmarks,arts,active,parks",  
        "limit": 10  
    }

    response = requests.get(YELP_SEARCH_URL, headers=headers, params=params)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch places"}), 500

    places = response.json().get("businesses", [])

    formatted_places = [
        {
            "id": place["id"],
            "name": place["name"],
            "address": ", ".join(place["location"]["display_address"]),
            "rating": place.get("rating", "N/A"),
            "image_url": place.get("image_url", ""),
        }
        for place in places
    ]

    return jsonify(formatted_places)
