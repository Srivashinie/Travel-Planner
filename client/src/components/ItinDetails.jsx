import React from "react";

const ItineraryDetails = ({ itinerary }) => {
  return (
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
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {itinerary}
      </pre>
    </div>
  );
};

export default ItineraryDetails;
