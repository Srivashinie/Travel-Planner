import React, { useState } from "react";
import axios from "axios";
import ItineraryForm from "../components/ItinForm";
import ItineraryDetails from "../components/ItinDetails";
import WeatherDetails from "../components/WeatherDetails";

const Itinerary = () => {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fetch itinerary data
      const response = await axios.post("/api/itinerary/generate", {
        place,
        days,
      });

      setItinerary(response.data.itinerary);
      setError("");

      // Fetch weather data for the place
      const weatherResponse = await axios.get(
        `/api/weather/weather?place=${place}`
      );

      setWeather(weatherResponse.data);
    } catch (err) {
      setError(
        "Failed to generate itinerary or Weather data. Please try again."
      );
      setItinerary("");
      setWeather(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "white",
        padding: "0px",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          background:
            "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(22,93,112,1)  100%)",

          padding: "20px",
          borderRadius: "0px",
          marginBottom: "10px",
        }}
      >
        <h1 className="text-center mb-4" style={{ color: "white" }}>
          Itinerary Generator
        </h1>
        <ItineraryForm
          place={place}
          days={days}
          setPlace={setPlace}
          setDays={setDays}
          handleSubmit={handleSubmit}
        />

        {error && (
          <div
            className="alert alert-danger text-center mt-4"
            style={{
              fontSize: "16px",
              padding: "15px",
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        {itinerary && <ItineraryDetails itinerary={itinerary} />}

        {weather && <WeatherDetails weather={weather} place={place} />}
      </div>
    </div>
  );
};

export default Itinerary;
