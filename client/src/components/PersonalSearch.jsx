import React, { useState } from "react";

const ItinerarySearch = ({ onCreateItinerary, onSearch }) => {
  const [itineraryName, setItineraryName] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateItinerary = () => {
    if (itineraryName) {
      onCreateItinerary(itineraryName);
      setItineraryName("");
    }
  };

  const handleSearch = () => {
    if (!location.trim()) {
      setErrorMessage(
        "Location cannot be empty. Please enter a valid location."
      );
    } else {
      setErrorMessage("");
      fetchPlaces(location, itinerary.id).catch(() => {
        console.error("Failed to fetch places");
      });
    }
  };

  return (
    <div className="searchitin-container">
      <h2 className="personal-itin">Search for Places and Create Itinerary</h2>
      <div>
        <input
          type="text"
          placeholder="Itinerary Name"
          value={itineraryName}
          onChange={(e) => setItineraryName(e.target.value)}
        />
        <button onClick={handleCreateItinerary}>Create Itinerary</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search Places</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ItinerarySearch;
