import os
import requests
from datetime import date, timedelta
from flask import Blueprint, request

api_key = os.getenv('SERP_API_KEY')

hotel_bp = Blueprint('hotel_bp', __name__)

@hotel_bp.route("/generate", methods=["GET"])
def get_hotels():
    destination = request.args.get("destination")
    check_in_date = request.args.get("check_in_date")
    check_out_date = request.args.get("check_out_date")
    base_url = f"https://serpapi.com/search.json?engine=google_hotels&q={destination}&as_eqp={destination}&check_in_date={check_in_date}&check_out_date={check_out_date}&hl=en&api_key={api_key}"

    try:
        # Sending GET request to SerpAPI
        response = requests.get(base_url)
        
        # Check if the response status code is 200 (OK)
        if response.status_code == 200:
            data = response.json()
            # for debug
            #print("Full Response:", response.json())
            
            hotels = data["properties"]
            
            if hotels:
                for hotel in hotels:
                    print(f"Hotel: {hotel['name']}")
            else:
                print(f"No hotels found for {destination}.")
                
            return hotels
        
        else:
            print(f"Error: Unable to fetch data for city: {destination} (status code: {response.status_code})")
            print(f"Response error text: {response.text}") # very important for debug
            
    except Exception as e:
        print(f"error occurred: {e}")
