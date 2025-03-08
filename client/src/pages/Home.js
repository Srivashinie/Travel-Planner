import React from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const Home = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>
          <strong>Find Your Next Escape✈️🌍</strong>
        </h1>
        <p className="home-description">
          Plan your perfect trip with personalized itineraries, hotel and
          restaurant recommendations, and top attractions!
        </p>

        <div className="home-sections">
          <div className="home-card itinerary">
            <h2>Itinerary</h2>
            <p>
              Plan your trip with the best places to visit and things to do.
            </p>
          </div>
          <div className="home-card hotels">
            <h2>Hotels</h2>
            <p>
              Find the perfect place to stay, with options ranging from budget
              to luxury.
            </p>
          </div>
          <div className="home-card restaurants">
            <h2>Restaurants</h2>
            <p>
              Discover the best dining experiences, from local favorites to
              top-rated eateries.
            </p>
          </div>
        </div>

        <button className="home-button" onClick={() => navigate("/itin")}>
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;
