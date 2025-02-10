import React, { useState } from "react";

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
    <div
      style={{
        minHeight: "10vh",
        color: "blue",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "600px",
          backgroundColor: "lightgray",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div>
          <h2 style={{ color: "maroon", padding: "8px" }}>
            <strong>EXPLORE HOTELS</strong>
          </h2>
          <input
            type="text"
            id="destination"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)} // Update destination state
            style={{
              marginRight: "15px",
              padding: "8px",
              width: "250px",
            }} // Adds space & padding and width
          />
          <button
            onClick={searchHotels}
            style={{
              marginRight: "15px",
              padding: "5px",
              width: "180px",
              height: "45px",
              backgroundcolor: "white",
            }}
          >
            <strong>Search Hotels</strong>
          </button>

          {/* Display hotels */}
          <div id="hotels-list">
            {loading ? (
              <p style={{ margin: "20px 0", padding: "5px 0" }}>
                Where do you want to explore?
              </p>
            ) : hotels.length === 0 ? (
              <p>No hotels found</p>
            ) : (
              <ul>
                {hotels.map((hotel, index) => (
                  <li key={index} style={{ marginBottom: "15px" }}>
                    <strong style={{ marginBottom: "15px", color: "red" }}>
                      {hotel.name}
                    </strong>
                    <div>
                      <strong>{"Price "}</strong>
                      {hotel.total_rate.lowest || "Price not available"}{" "}
                    </div>
                    <div>
                      <strong>{"Ratings "}</strong>{" "}
                      {hotel.overall_rating || "Ratings not available"}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
