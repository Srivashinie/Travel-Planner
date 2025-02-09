import React from "react";

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="restaurant-list">
      <h2>Restaurant Results</h2>
      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={restaurant.image_url || "https://via.placeholder.com/150"}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>
                <strong>Rating:</strong> {restaurant.rating} stars
              </p>
              <p>
                <strong>Price Range:</strong> {restaurant.price || "N/A"}
              </p>
              <a
                href={restaurant.url}
                target="_blank"
                rel="noopener noreferrer"
                className="view-link">
                View on Yelp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
