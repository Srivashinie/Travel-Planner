import React from "react";

const ItineraryDetails = ({ itinerary }) => {
  return (
    <div
      className="mt-4"
      style={{
        width: "75%",
        background: "white",
        color: "black",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        margin: "0 auto",
      }}
    >
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          fontFamily: "'Caveat', cursive",
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#333",
        }}
      >
        {itinerary}
      </pre>
    </div>
  );
};

export default ItineraryDetails;
