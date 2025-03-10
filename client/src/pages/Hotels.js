import React, { useState } from "react";
import "../style.css";
import HotelDetails from "../components/HotelDetails";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState("all");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Function to fetch hotels from Flask backend
  const searchHotels = async () => {
    if (!destination || !checkInDate || !checkOutDate) {
      alert("Please enter all the fields");
      return;
    }

    try {
      // Send GET request to Flask backend server
      const response = await fetch(
        `http://localhost:5000/api/hotel/generate?destination=${destination}&check_in_date=${checkInDate}&check_out_date=${checkOutDate}`
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

    if (budget === "cheap") return price < 100;
    if (budget === "normal") return price >= 100 && price <= 180;
    if (budget === "high") return price > 180;

    return true;
  };

  return (
    <div className="hotels-container">
      <div className="form-box">
        <h2>
          <strong>EXPLORE HOTELS</strong>
        </h2>
        <div className="search-box">
          <label
            style={{
              fontWeight: "bold",
              fontSize: "17px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            placeholder="Please enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{
              margin: "10px",
              padding: "8px",
              width: "660px",
              border: "1px solid lightgray",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
            }}
          />

          {/* Check-in Date */}
          <div className="search-fields">
            <div>
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Check-in:
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                style={{
                  margin: "5px",
                  padding: "5px",
                  width: "150px",
                  fontSize: "15px",
                  border: "1px solid lightgray",
                  height: "40px",
                  fontFamily: "Arial, sans-serif",
                  color: "black",
                }}
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Check-out:
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                style={{
                  margin: "5px",
                  padding: "8px",
                  width: "150px",
                  fontSize: "15px",
                  border: "1px solid lightgray",
                  height: "40px",
                  color: "black",
                }}
              />
            </div>

            {/* Budget filter dropdown */}
            <div className="filter-box">
              <label htmlFor="budget">
                <strong>Budget: </strong>
              </label>
              <select
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{ border: "1px solid lightgray" }}
              >
                <option value="all">All</option>
                <option value="cheap">Cheap (Below $100)</option>
                <option value="normal">Normal ($100 - $180)</option>
                <option value="high">High (Above $180)</option>
              </select>
            </div>
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
          hotels
            .filter(budgetFilter)
            .map((hotel, index) => <HotelDetails key={index} hotel={hotel} />)
        )}
      </div>
    </div>
  );
};

export default Hotels;
