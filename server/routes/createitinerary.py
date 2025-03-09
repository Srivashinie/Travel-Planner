from flask import Blueprint, request, jsonify
from db import db  
import requests
import os

place_search_bp = Blueprint('place_search', __name__)

YELP_API_KEY = os.getenv("YELP_API_KEY")
if not YELP_API_KEY:
    raise ValueError("YELP_API_KEY is not set in the environment variables.")
YELP_SEARCH_URL = "https://api.yelp.com/v3/businesses/search"

# Search for places using Yelp API
@place_search_bp.route('/search_places', methods=['GET'])
def search_places():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    headers = {"Authorization": f"Bearer {YELP_API_KEY}"}
    params = {
        "location": query,
        "term": "tourist attractions",
        "categories": "landmarks,arts,active,parks",
        "limit": 10
    }

    response = requests.get(YELP_SEARCH_URL, headers=headers, params=params)

    if response.status_code != 200:
        return jsonify({"error": f"Failed to fetch places: {response.json().get('error', {}).get('description', 'Unknown error')}" }), 500

    places = response.json().get("businesses", [])

    if not places:
        return jsonify({"error": "No places found for the given location."}), 404

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

# Save an itinerary to MongoDB
@place_search_bp.route('/save_itinerary', methods=['POST'])
def save_itinerary():
    data = request.json
    if not data or not data.get("name"):
        return jsonify({"error": "Invalid data"}), 400

    itinerary = {
        "id": data.get("id"),
        "name": data["name"],
        "places": data.get("places", []),
        "searchResults": data.get("searchResults", [])
    }

    existing_itinerary = db.itineraries.find_one({"id": data["id"]})
    if existing_itinerary:
        db.itineraries.update_one({"id": data["id"]}, {"$set": itinerary})
        return jsonify({"message": "Itinerary updated successfully!"})
    else:
        db.itineraries.insert_one(itinerary)
        return jsonify({"message": "Itinerary saved successfully!"})

# Retrieve all saved itineraries from MongoDB
@place_search_bp.route('/get_itineraries', methods=['GET'])
def get_itineraries():
    itineraries = list(db.itineraries.find({}, {"_id": 0}))  # Fetch all itineraries
    return jsonify(itineraries)

# Get a specific itinerary by ID
@place_search_bp.route('/get_itinerary/<itinerary_id>', methods=['GET'])
def get_itinerary(itinerary_id):
    itinerary = db.itineraries.find_one({"id": int(itinerary_id)}, {"_id": 0})
    if not itinerary:
        return jsonify({"error": "Itinerary not found"}), 404
    return jsonify(itinerary)

# Delete an itinerary by ID
@place_search_bp.route('/delete_itinerary/<itinerary_id>', methods=['DELETE'])
def delete_itinerary(itinerary_id):
    result = db.itineraries.delete_one({"id": int(itinerary_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Itinerary deleted successfully!"})
    return jsonify({"error": "Itinerary not found"}), 404
