import React, { useState } from "react";

const ItinerarySearch = ({ onCreateItinerary, onSearch }) => {
  const [itineraryName, setItineraryName] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateItinerary = () => {
    if (itineraryName) {
      onCreateItinerary(itineraryName);
      setItineraryName("");
    }
  };

  const handleSearch = () => {
    onSearch(location);
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
      </div>
    </div>
  );
};

export default ItinerarySearch;
