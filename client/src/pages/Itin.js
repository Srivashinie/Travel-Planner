import React, { useState } from "react";
import axios from "axios";
import ItineraryForm from "../components/ItinForm";
import ItineraryDetails from "../components/ItinDetails";
import WeatherDetails from "../components/WeatherDetails";
import { Link } from "react-router-dom";

const Itinerary = () => {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [weather, setWeather] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
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

      // Fetch restaurant data for the place
      const restaurantResponse = await axios.get(
        `/api/restaurants/restaurants`,
        { params: { location: place } }
      );

      // Sort restaurants by rating and take top 5
      let sortedRestaurants = restaurantResponse.data
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      // Remove duplicate restaurant names (if any)
      sortedRestaurants = sortedRestaurants.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      );

      setRestaurants(sortedRestaurants);
    } catch (err) {
      setError(
        "Failed to generate itinerary, weather data, or restaurants. Please try again."
      );
      setItinerary("");
      setWeather(null);
      setRestaurants([]);
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

        {!loading && itinerary && weather && restaurants.length > 0 && (
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

              {/* Restaurants Component */}
              <div
                className="mt-4"
                style={{
                  width: "95%",
                  background:
                    "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(22,93,112,1)  100%)",
                  color: "black",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                  margin: "0 auto",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: "white",
                    fontSize: "24px",
                  }}
                >
                  <strong> Recommended Restaurants in {place}</strong>
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                    {restaurants.map((restaurant) => (
                      <p
                        key={restaurant.id}
                        style={{
                          marginTop: "20px",
                          fontFamily: "'Caveat', cursive",
                          fontSize: "16px",
                          color: "white",
                          paddingBottom: "5px",
                          backgroundColor: "transparent",
                        }}
                      >
                        * {restaurant.name} Restaurant with rating of {""}
                        {restaurant.rating} stars
                      </p>
                    ))}
                  </ul>
                  <Link
                    to="/restaurants"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "white",
                      color: "rgba(22,93,112,1)",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Explore Restaurants
                  </Link>
                  <p
                    style={{
                      marginTop: "20px",
                      fontFamily: "'Caveat', cursive",
                      fontSize: "14px",
                      color: "white",
                      paddingBottom: "5px",
                      backgroundColor: "transparent",
                    }}
                  >
                    Ready to find a place to stay? In addition to exploring
                    great restaurants, you can also discover amazing hotels
                    tailored to your destination, dates, and budget!
                  </p>
                  <Link
                    to="/hotels"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "rgba(22,93,112,1)",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      marginTop: "10px",
                    }}
                  >
                    Explore Hotels
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;
