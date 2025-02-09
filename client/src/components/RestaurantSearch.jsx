import React, { useState } from "react";

const RestaurantSearch = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(location, category, price);
  };

  return (
    <div className="search-container">
      <h2>Search for Restaurants</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter location (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter type of food (e.g., pizza)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter price range (e.g., $, $$, $$$)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default RestaurantSearch;
