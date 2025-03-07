import unittest
from unittest.mock import patch
from flask import Flask
from .hotel import hotel_bp

app = Flask(__name__)
app.register_blueprint(hotel_bp)
client = app.test_client()

class TestGetHotels(unittest.TestCase):

    @patch('requests.get')
    def test_get_hotels_success(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            "properties": [
                {"name": "Hyatt Grand Central"},
                {"name": "Hilton Gargen Inn"}
            ]
        }

        response = client.get("/generate?destination=New+York&check_in_date=2023-12-01&check_out_date=2023-12-05")

        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Hyatt Grand Central", response.data)
        self.assertIn(b"Hilton Gargen Inn", response.data)

    @patch('requests.get')
    def test_get_hotels_empty_response(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {"properties": []}
        response = client.get("/generate?destination=New+York&check_in_date=2023-12-01&check_out_date=2023-12-05")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'[]\n')

    @patch('requests.get')
    def test_get_hotels_api_error(self, mock_get):
        mock_get.return_value.status_code = 500
        mock_get.return_value.text = "Unable to fetch data"
        response = client.get("/generate?destination=New+York&check_in_date=2023-12-01&check_out_date=2023-12-05")

        self.assertEqual(response.status_code, 500)
        self.assertIn(b"Unable to fetch data", response.data)
    
    @patch('requests.get')
    def test_get_hotels_empty_destination(self, mock_get):
        mock_get.return_value.status_code = 400
        mock_get.return_value.text = "Destination is required"
        # Making a request without a destination
        response = client.get("/generate?check_in_date=2023-12-01&check_out_date=2023-12-05")

        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Destination is required", response.data)
        
    @patch('requests.get')
    def test_get_hotels_missing_check_in_date(self, mock_get):
        mock_get.return_value.status_code = 400
        mock_get.return_value.text = "Check-in date is required"
        # requesting with missing check-in-date
        response = client.get("/generate?destination=New+York&check_out_date=2023-12-05")

        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Check-in date is required", response.data)
    
    @patch('requests.get')
    def test_get_hotels_missing_check_out_date(self, mock_get):
        mock_get.return_value.status_code = 400
        mock_get.return_value.text = "Check-out Date is required"
        # requesting with missing check-out-date
        response = client.get("/generate?destination=New+York&check_in_date=2023-12-03")

        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Check-out Date is required", response.data)
        
    @patch('requests.get')
    def test_get_hotels_wrong_apikey(self, mock_get):
        mock_get.return_value.status_code = 401
        mock_get.return_value.text = "Unable to fetch data"
        # requesting with wrong apikey
        response = client.get("/generate?destination=New+York&check_in_date=2023-12-01&check_out_date=2023-12-05")
        
        self.assertEqual(response.status_code, 401)
        self.assertIn(b"Unable to fetch data", response.data)
          
if __name__ == "__main__":
    unittest.main()