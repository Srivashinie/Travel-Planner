import React from "react";

// Import local weather icon images
import clearIcon from "../assets/images/sun.png";
import cloudsIcon from "../assets/images/cloudy.png";
import rainIcon from "../assets/images/rainy.png";
import snowIcon from "../assets/images/snow.png";
import drizzleIcon from "../assets/images/drizzle.png";
import mistIcon from "../assets/images/mist.png";
import smokeIcon from "../assets/images/smoke.png";
import windIcon from "../assets/images/wind.png";

const WeatherDetails = ({ weather, place }) => {
  const getIconForWeather = (description) => {
    if (description.includes("clouds")) {
      return cloudsIcon;
    } else if (description.includes("clear")) {
      return clearIcon;
    } else if (description.includes("mist")) {
      return mistIcon;
    } else if (description.includes("rain")) {
      return rainIcon;
    } else if (description.includes("drizzle")) {
      return drizzleIcon;
    } else if (description.includes("snow")) {
      return snowIcon;
    } else if (description.includes("smoke")) {
      return smokeIcon;
    } else if (description.includes("wind")) {
      return windIcon;
    }
    return cloudsIcon;
  };

  const weatherIcon = getIconForWeather(weather.description);

  return (
    <div
      className="mt-4"
      style={{
        width: "95%",
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(22,93,112,1)  100%)",
        color: "black",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        margin: "0 auto",
      }}
    >
      <h3
        style={{
          fontFamily: "'Caveat', cursive",
          color: "white",
          fontSize: "24px",
        }}
      >
        <strong> Current Weather in {place}:</strong>
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <p>
            <strong>Temperature:</strong> {weather.temperature}°C
          </p>
          <p>
            <strong>Feels Like:</strong> {weather.feels_like}°C
          </p>
          <p>
            <strong>Humidity:</strong> {weather.humidity}%
          </p>
          <p>
            <strong>Description:</strong> {weather.description}
          </p>
        </div>
        <img
          src={weatherIcon}
          alt="weather icon"
          style={{
            width: "250px",
            height: "250px",
          }}
        />
      </div>
    </div>
  );
};

export default WeatherDetails;
