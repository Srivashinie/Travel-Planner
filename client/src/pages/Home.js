import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        textAlign: "center",
        flexDirection: "column",
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgb(16, 123, 153)  100%)",
      }}
    >
      <div style={{ padding: "100px" }}>
        <h1>
          <strong>Find Your Next Escape✈️🌍</strong>
        </h1>
        <p
          style={{
            fontSize: "20px",
            color: "#rgba(52, 4, 102, 0.1)",
            padding: "20px",
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          Plan your perfect trip with personalized itineraries, hotel and
          restaurants recommendations, and top attractions!
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            maxWidth: "1200px",
            marginTop: "50px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "30%",
            }}
          >
            <h2 style={{ color: "#e67e22", fontSize: "25px" }}>Itinerary</h2>
            <p style={{ color: "#7f8c8d" }}>
              Plan your trip with the best places to visit and things to do.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "30%",
            }}
          >
            <h2 style={{ color: "#3498db", fontSize: "25px" }}>Hotels</h2>
            <p style={{ color: "#7f8c8d" }}>
              Find the perfect place to stay, with options ranging from budget
              to luxury.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "30%",
            }}
          >
            <h2 style={{ color: "#2ecc71", fontSize: "25px" }}>Restaurants</h2>
            <p style={{ color: "#7f8c8d" }}>
              Discover the best dining experiences, from local favorites to
              top-rated eateries.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/itin")}
          style={{
            marginTop: "50px",
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "black",
            backgroundColor: "lightcoral",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;
