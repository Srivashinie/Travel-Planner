import React from "react";

const ItineraryForm = ({ place, days, setPlace, setDays, handleSubmit }) => {
  return (
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
          placeholder="Enter your destination"
          style={{
            flex: "1",
            backgroundColor: "white",
            color: "lightgray",
            fontSize: "12px",
          }}
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
          placeholder="Enter number of days"
          style={{
            flex: "1",
            backgroundColor: "white",
            color: "lightgray",
            fontSize: "12px",
          }}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn"
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            color: "rgba(22,93,112,1)",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "black";
            e.target.style.border = "white";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.border = "none";
          }}
        >
          Generate Itinerary
        </button>
      </div>
    </form>
  );
};

export default ItineraryForm;
