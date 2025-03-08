import React, { useState } from "react";

const CreateItineraryList = ({
  itinerary,
  fetchPlaces,
  setItineraries,
  saveItinerary,
}) => {
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addPlaceToItinerary = (place) => {
    setItineraries((prevItineraries) =>
      prevItineraries.map((itin) =>
        itin.id === itinerary.id
          ? {
              ...itin,
              places: [
                ...itin.places,
                { name: place.name, address: place.address }, // Save name and address
              ],
              searchResults: itin.searchResults.filter(
                (p) => p.id !== place.id
              ),
            }
          : itin
      )
    );
  };

  const removePlaceFromItinerary = (placeName) => {
    setItineraries((prevItineraries) =>
      prevItineraries.map((itin) =>
        itin.id === itinerary.id
          ? {
              ...itin,
              places: itin.places.filter((p) => p.name !== placeName),
            }
          : itin
      )
    );
  };

  const [showSearchResults, setShowSearchResults] = useState(true);

  const handleSearch = () => {
    if (!location.trim()) {
      setErrorMessage(
        "Location cannot be empty. Please enter a valid location."
      );
    } else {
      setErrorMessage("");
      fetchPlaces(location, itinerary.id);
    }
  };

  const handleSave = () => {
    saveItinerary(itinerary.id);
    setShowSearchResults(false);
  };

  return (
    <div className="itinerarylist-container">
      <h3>{itinerary.name}</h3>

      <div>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button className="personal-itin-button" onClick={handleSearch}>
          Search Places
        </button>
      </div>

      <h3 className="personal-itin">Itinerary Places</h3>
      <ul>
        {itinerary.places.map((place, index) => (
          <li key={index}>
            <strong>{place.name}</strong> - {place.address}
            <button
              className="delete-button"
              onClick={() => removePlaceFromItinerary(place.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button className="save-button" onClick={handleSave}>
        Save
      </button>

      {showSearchResults ? (
        <>
          <h3 className="personal-itin">Search Results</h3>
          <div className="searchitin-results">
            <ul>
              {itinerary.searchResults.length > 0 ? (
                itinerary.searchResults.map((place) => (
                  <li key={place.id}>
                    <img src={place.image_url} alt={place.name} width="50" />
                    <strong>{place.name}</strong>
                    <p>{place.address}</p> {/* Displaying address */}
                    <button
                      className="add-button"
                      onClick={() => addPlaceToItinerary(place)}>
                      Add
                    </button>
                  </li>
                ))
              ) : (
                <p>No places found.</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p className="saved-message">Itinerary saved!</p>
      )}
    </div>
  );
};

export default CreateItineraryList;
