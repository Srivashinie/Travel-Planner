import React from "react";

const WeatherDetails = ({ weather, place }) => {
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
      <h3
        style={{
          fontFamily: "'Caveat', cursive",
          color: "rgba(22,93,112,1)",
          fontSize: "24px",
        }}
      >
        Current Weather in {place}:
      </h3>
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
      <img
        src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
        alt="weather icon"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default WeatherDetails;
