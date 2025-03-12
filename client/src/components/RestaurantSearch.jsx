import React, { useState } from "react";
import { FaMapMarkerAlt, FaUtensils, FaDollarSign } from "react-icons/fa";

const RestaurantSearch = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (price < 1 || price > 4) {
      setError("Please enter a price level between 1 and 4.");
    } else {
      setError("");
      onSearch(location, category, price);
    }
  };

  return (
    <div
      className="search-container"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0)",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        padding: "50px",
        margin: "30px auto",
      }}>
      <h1>
        Search for Restaurants<span>🍽️</span>
      </h1>

      <form onSubmit={handleSubmit} className="search-form">
        {/* Labels Row */}
        <div className="label-row">
          <label htmlFor="location">Location</label>
          <label htmlFor="category">Category</label>
          <label htmlFor="price">Price Range</label>
        </div>

        {/* Inputs Row */}
        <div className="input-row">
          <div className="input-group">
            <FaMapMarkerAlt className="icon" />
            <input
              type="text"
              id="location"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaUtensils className="icon" />
            <input
              type="text"
              id="category"
              placeholder="Type of food"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FaDollarSign className="icon" />
            <input
              type="text"
              id="price"
              placeholder="Price Level (1 - 4)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          style={{ marginTop: "15px" }}
          className="search-button">
          {" "}
          Search Restaurants
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RestaurantSearch;
