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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Fetch itinerary data
      const response = await axios.post("/api/itinerary/generate", {
        place,
        days,
      });

      setItinerary(response.data.itinerary);

      // Fetch weather data for the place
      const weatherResponse = await axios.get(
        `/api/weather/weather?place=${place}`
      );

      setWeather(weatherResponse.data);
    } catch (err) {
      setError(
        "Failed to generate itinerary or weather data. Please try again."
      );
      setItinerary("");
      setWeather(null);
    } finally {
      setLoading(false);
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

        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                width: "4rem",
                height: "4rem",
                border: "8px solid rgba(255, 255, 255, 0.2)",
                borderTop: "8px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ color: "white", marginTop: "10px", fontSize: "18px" }}>
              Generating your itinerary...
            </p>
          </div>
        )}

        <style>
          {`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}
        </style>

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

        {!loading && itinerary && weather && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <div style={{ flex: "2" }}>
              <ItineraryDetails itinerary={itinerary} />
            </div>
            <div style={{ flex: "1" }}>
              <WeatherDetails weather={weather} place={place} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;
