import React, { useState } from "react";
import "../style.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]); // State to hold hotel list
  const [destination, setDestination] = useState(""); // State for destination input
  const [loading, setLoading] = useState(true);

  // Function to fetch hotels from Flask backend
  const searchHotels = async () => {
    if (!destination) {
      alert("Please enter a destination");
      return;
    }

    try {
      // Send GET request to Flask backend server
      const response = await fetch(
        `http://localhost:5000/api/hotel/generate?destination=${destination}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setHotels(data); // Update state with fetched hotel data (hotels = data)
      } else {
        setHotels([]); // No hotels found
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      alert("Failed to fetch hotels.");
      setLoading(false);
    }
  };

  return (
    <div className="hotels-container">
      <div className="form-box">
        <h2>
          <strong>EXPLORE HOTELS</strong>
        </h2>
        <div className="search-box">
          <input
            type="text"
            id="destination"
            placeholder="Please enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)} // Update destination state
            style={{
              marginRight: "15px",
              padding: "8px",
              width: "250px",
            }}
          />
          <button onClick={searchHotels}>Search Hotels</button>
        </div>
        <p>Where do you want to stay?</p>
      </div>

      {/* Display hotels in card layout */}
      <div className="hotels-list">
        {loading ? (
          <p></p>
        ) : hotels.length === 0 ? (
          <p>No hotels found</p>
        ) : (
          hotels.map((hotel, index) => (
            <div
              key={index}
              style={{ marginBottom: "15px" }}
              className="hotel-card"
            >
              <img
                src={
                  hotel.images[0].thumbnail ||
                  hotel.images[1].thumbnail ||
                  hotel.images[2].thumbnail ||
                  hotel.images[3].thumbnail
                }
                alt="Hotel"
                className="hotel-image"
              />
              <div className="card-content">
                <h3>
                  <strong>{hotel.name}</strong>
                </h3>
                <p>
                  <strong>{"Price "}</strong>
                  {hotel.total_rate.lowest || "Price not available"}{" "}
                </p>
                <p>
                  <strong>{"Ratings "}</strong>{" "}
                  {hotel.overall_rating || "Ratings not available"}
                </p>
                <a
                  href={hotel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hotel-link"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Hotels;
