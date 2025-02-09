from flask import Flask
from flask_cors import CORS
from routes.itinerary import itinerary_bp
from routes.restaurants import restaurants_bp 

app = Flask(__name__)
CORS(app)

# Register blueprints for different routes
app.register_blueprint(itinerary_bp, url_prefix='/api/itinerary')
app.register_blueprint(restaurants_bp, url_prefix='/api/restaurants')

if __name__ == '__main__':
    app.run(port=5000, debug=True)


