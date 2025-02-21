import React, { useState } from "react";
import axios from "axios";
import ItineraryForm from "../components/ItinForm";
import ItineraryDetails from "../components/ItinDetails";

const Itinerary = () => {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fetch itinerary data
      const response = await axios.post("/api/itinerary/generate", {
        place,
        days,
      });

      setItinerary(response.data.itinerary);
      setError("");
    } catch (err) {
      setError("Failed to generate itinerary. Please try again.");
      setItinerary("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "black",
        padding: "20px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "800px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-center mb-4" style={{ color: "#2C3E50" }}>
          Itinerary Generator
        </h1>
        <ItineraryForm
          place={place}
          days={days}
          setPlace={setPlace}
          setDays={setDays}
          handleSubmit={handleSubmit}
        />

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

        {itinerary && <ItineraryDetails itinerary={itinerary} />}
      </div>
    </div>
  );
};

export default Itinerary;
