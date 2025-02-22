import openai
import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()
weather_bp = Blueprint('weather_bp', __name__)
openweather_api_key = os.getenv("OPENWEATHER_API_KEY") 

# Route for Weather data using OpenWeather API
@weather_bp.route('/weather', methods=['GET'])
def get_weather():
    place = request.args.get('place')

    if not place:
        return jsonify({'error': 'Place is required to fetch weather data.'}), 400

    geocoding_api_url = f'http://api.openweathermap.org/geo/1.0/direct?q={place}&appid={openweather_api_key}'
    
    try:
        geo_response = requests.get(geocoding_api_url)
        geo_data = geo_response.json()

        if not geo_data:
            return jsonify({'error': 'Place not found. Please enter a valid place.'}), 404

        lat = geo_data[0]['lat']
        lon = geo_data[0]['lon']

        weather_api_url = f'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={openweather_api_key}&units=metric'
        weather_response = requests.get(weather_api_url)
        weather_data = weather_response.json()

        if weather_response.status_code != 200:
            return jsonify({'error': weather_data.get('message', 'Failed to fetch weather data')}), 500

        return jsonify({
            'temperature': weather_data['current']['temp'],
            'feels_like': weather_data['current']['feels_like'],
            'humidity': weather_data['current']['humidity'],
            'description': weather_data['current']['weather'][0]['description'],
            'icon': weather_data['current']['weather'][0]['icon'],
            'name': place,  
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500