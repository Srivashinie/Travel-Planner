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
  );
};

export default ItineraryForm;
