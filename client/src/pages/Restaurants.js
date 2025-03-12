import React, { useState } from "react";
import axios from "axios";
import RestaurantSearch from "../components/RestaurantSearch";
import RestaurantList from "../components/RestaurantList";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState("");

  const fetchRestaurants = async (location, category, price) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/restaurants/restaurants",
        { params: { location, category, price } }
      );

      if (response.data.error) {
        setError(response.data.error);
        setRestaurants([]);
      } else {
        setError("");
        setRestaurants(response.data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError(
        "No restaurants found. Please try another location or category."
      );
      setRestaurants([]);
    }
  };

  return (
    <div
      style={{
        paddingTop: "80px",
        backgroundImage:
          "linear-gradient(to right top, #fdcfbf, #ebcbb0, #d7c7a7, #c2c3a2, #adbea1, #a3bda2, #99bca5, #8fbba8, #8bbfac, #86c2b1, #81c6b6, #7bc9bc)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}>
      <div className="restaurants-container">
        <RestaurantSearch onSearch={fetchRestaurants} />
        <RestaurantList restaurants={restaurants} error={error} />
      </div>
    </div>
  );
};

export default Restaurants;
