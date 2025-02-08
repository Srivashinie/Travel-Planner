import React, { useState } from "react";
import axios from "axios";

const Itinerary = () => {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
        <form onSubmit={handleSubmit}>
          <div
            className="mb-3"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <label
              htmlFor="place"
              className="form-label fw-bold"
              style={{ flexBasis: "100px" }}
            >
              Destination:
            </label>
            <input
              type="text"
              id="place"
              className="form-control"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              style={{ flex: "1" }}
            />
          </div>
          <div
            className="mb-3"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <label
              htmlFor="days"
              className="form-label fw-bold"
              style={{ flexBasis: "100px" }}
            >
              Days:
            </label>
            <input
              type="text"
              id="days"
              className="form-control"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              style={{ flex: "1" }}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: "10px 20px" }}
            >
              Generate Itinerary
            </button>
          </div>
        </form>

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

        {itinerary && (
          <div
            className="mt-4"
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              color: "black",
              width: "100%",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {/*<h2 className="text-center" style={{ color: "#2C3E50" }}>
              Generated Itinerary
            </h2>*/}
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {itinerary}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;
