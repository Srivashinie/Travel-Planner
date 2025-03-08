from flask import Flask
from flask_cors import CORS
from routes.itinerary import itinerary_bp
from routes.restaurants import restaurants_bp 
from routes.hotel import hotel_bp
from routes.createitinerary import place_search_bp 
from routes.weather import weather_bp
from db import db


app = Flask(__name__)
CORS(app)

# Register blueprints for different routes
app.register_blueprint(itinerary_bp, url_prefix='/api/itinerary')
app.register_blueprint(restaurants_bp, url_prefix='/api/restaurants')
app.register_blueprint(hotel_bp, url_prefix='/api/hotel')
app.register_blueprint(place_search_bp, url_prefix='/api/place')
app.register_blueprint(weather_bp, url_prefix='/api/weather')


if __name__ == '__main__':
    app.run(port=5000, debug=False)


