import React, { useState } from "react";
import axios from "axios";
import RestaurantSearch from "../components/RestaurantSearch";
import RestaurantList from "../components/RestaurantList";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async (location, category, price) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/restaurants/restaurants",
        {
          params: { location, category, price },
        }
      );
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return (
    <div className="restaurants-container">
      <RestaurantSearch onSearch={fetchRestaurants} />
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default Restaurants;
