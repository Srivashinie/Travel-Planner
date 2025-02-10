import React from "react";

const Home = ({ title }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <h1>
        <strong>Welcome to Travel Planner 🌍</strong>
      </h1>
      <p style={{ fontSize: "25px", color: "darkblue", padding: "20px" }}>
        Plan your perfect trip with personalized itineraries, hotel and
        restaurants recommendations, and top attractions!
      </p>
    </div>
  );
};

export default Home;
