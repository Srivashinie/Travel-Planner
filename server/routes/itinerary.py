import openai
import os
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()
itinerary_bp = Blueprint('itinerary_bp', __name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_itinerary(place, days):
    if not place or not days.isdigit():
        return "Error generating itinerary: Invalid input, please try again."

    try:
        # Prompt for itinerary generation
        messages = [
            {"role": "system", "content": "You are a helpful travel planner."},
            {"role": "user", "content": f"Generate a detailed {days}-day travel itinerary for {place}. Include attractions, activities, and suggestions for each day."}
        ]

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
   
        itinerary = response['choices'][0]['message']['content']
        return itinerary
    except Exception as e:
        return f"Error generating itinerary: {str(e)}"

@itinerary_bp.route('/generate', methods=['POST'])
def generate():
    place = request.json['place']
    days = request.json['days']

    if not place or not days.isdigit():
        return jsonify({'error': 'Invalid input, please try again.'})

    # Generate itinerary
    itinerary = generate_itinerary(place, days)

    return jsonify({'itinerary': itinerary})


