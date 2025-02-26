import unittest
from unittest.mock import patch
from flask import Flask
from itinerary import generate_itinerary

app = Flask(__name__)

class TestGenerateItinerary(unittest.TestCase):

    @patch('openai.ChatCompletion.create')
    def test_generate_itinerary_success(self, mock_openai):
        mock_openai.return_value = {
            'choices': [{'message': {'content': 'Sample itinerary'}}]
        }
        itinerary = generate_itinerary('Portland', '3')
        self.assertIn('Sample itinerary', itinerary)

    @patch('openai.ChatCompletion.create')
    def test_generate_itinerary_error(self, mock_openai):
        mock_openai.side_effect = Exception("API error")
        itinerary = generate_itinerary('Portland', '3')
        self.assertIn('Error generating itinerary', itinerary)

    def test_invalid_input_empty_place(self):
        itinerary = generate_itinerary('', '3')
        self.assertIn('Error generating itinerary', itinerary)

    def test_invalid_input_non_digit_days(self):
        itinerary = generate_itinerary('Portland', 'abc')
        self.assertIn('Error generating itinerary', itinerary)

    @patch('openai.ChatCompletion.create')
    def test_generate_itinerary_max_length(self, mock_openai):
        long_itinerary = 'This is a sample day 1 itinerary.' * 10  
        mock_openai.return_value = {
            'choices': [{'message': {'content': long_itinerary}}]
        }
        # Call the generate_itinerary function
        itinerary = generate_itinerary('Portland', '7')
        self.assertTrue(len(itinerary) <= 500, f"Length of itinerary was {len(itinerary)}, expected <= 500")
