import unittest
from unittest.mock import patch
from server.routes.restaurants import fetch_restaurants

class TestRestaurantAPI(unittest.TestCase):

    @patch('server.routes.restaurants.requests.get')
    def test_fetch_restaurants_success(self, mock_get):
        mock_response = {
            "businesses": [
                {"name": "Pizza Place"},
                {"name": "Burger Spot"}
            ]
        }
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response
        result, status_code = fetch_restaurants("San Francisco", "italian")
        self.assertEqual(status_code, 200)
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]["name"], "Pizza Place")

    @patch('server.routes.restaurants.requests.get')
    def test_fetch_restaurants_invalid_api_key(self, mock_get):
        mock_get.return_value.status_code = 401
        mock_get.return_value.json.return_value = {"error": "Invalid API Key"}
        result, status_code = fetch_restaurants("New York")
        self.assertEqual(status_code, 401)
        self.assertIn("error", result)
        self.assertEqual(result["error"], "Invalid API Key")


    @patch('server.routes.restaurants.requests.get')
    def test_fetch_restaurants_invalid_location(self, mock_get):
        mock_get.return_value.status_code = 400
        mock_get.return_value.json.return_value = {"error": "Invalid location"}
        result, status_code = fetch_restaurants("InvalidCity123")
        self.assertEqual(status_code, 400)
        self.assertIn("error", result)
        self.assertEqual(result["error"], "Invalid location")
    
    @patch('server.routes.restaurants.requests.get')
    def test_fetch_restaurants_not_found(self, mock_get):
        mock_get.return_value.status_code = 404
        mock_get.return_value.json.return_value = {"error": "Resource not found"}
        result, status_code = fetch_restaurants("Nonexistent Location")
        self.assertEqual(status_code, 404)
        self.assertIn("error", result)
        self.assertEqual(result["error"], "Resource not found")
    
    @patch('server.routes.restaurants.requests.get')
    def test_fetch_restaurants_no_results(self, mock_get):
        mock_response = {
            "businesses": [] 
        } 
        mock_get.return_value.status_code = 200  
        mock_get.return_value.json.return_value = mock_response  
        result, status_code = fetch_restaurants("EmptyCity")
        self.assertEqual(status_code, 200)
        self.assertEqual(len(result), 0)
        self.assertEqual(result, [])

if __name__ == '__main__':
    unittest.main()
