import React, { useState } from "react";
import "../style.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState("all");

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
        setHotels(data); // Update state with fetched hotel data
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

  // Function to filter hotels based on selected budget
  const budgetFilter = (hotel) => {
    const price =
      parseFloat(hotel.total_rate.lowest.replace(/[^0-9.]/g, "")) || 0;
    console.log(`Hotel: ${hotel.name}, Price: ${price}, Budget: ${budget}`);

    if (budget === "cheap") return price < 100;
    if (budget === "normal") return price >= 100 && price <= 180;
    if (budget === "high") return price > 180;

    return true; // Show all if no filter applied
  };

  return (
    <div className="hotels-container">
      <div className="form-box">
        <h2>
          <strong>EXPLORE HOTELS</strong>
        </h2>
        <div className="search-box">
          <lebel style={{ fontWeight: "bold", fontSize: "17px" }}>
            Destination:{" "}
          </lebel>
          <input
            type="text"
            id="destination"
            placeholder="Please enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              marginRight: "15px",
              padding: "8px",
              width: "250px",
            }}
          />
          {/* Budget filter dropdown */}
          <div className="filter-box">
            <label htmlFor="budget">
              <stong>Budget: </stong>{" "}
            </label>
            <select
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="all">All</option>
              <option value="cheap">Cheap (Below $100)</option>
              <option value="normal">Normal ($100 - $180)</option>
              <option value="high">High (Above $180)</option>
            </select>
          </div>
        </div>
        <button onClick={searchHotels}>Search Hotels</button>
      </div>

      {/* Display hotels in card layout */}
      <div className="hotels-list">
        {loading ? (
          <p></p>
        ) : hotels.filter(budgetFilter).length === 0 ? (
          <p>No hotels found</p>
        ) : (
          hotels.filter(budgetFilter).map((hotel, index) => (
            <div key={index} className="hotel-card">
              <img
                src={
                  hotel.images?.[0]?.thumbnail ||
                  hotel.images?.[1]?.thumbnail ||
                  hotel.images?.[2]?.thumbnail ||
                  hotel.images?.[3]?.thumbnail ||
                  "default-hotel.jpg"
                }
                alt="Hotel"
                className="hotel-image"
              />
              <div className="card-content">
                <h3>
                  <strong>{hotel.name}</strong>
                </h3>
                <p>
                  <strong>Price: </strong>
                  {hotel.total_rate.lowest || "Price not available"}
                </p>
                <p>
                  <strong>Ratings: </strong>
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
