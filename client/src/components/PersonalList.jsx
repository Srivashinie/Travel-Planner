import React, { useState } from "react";

const CreateItineraryList = ({
  itinerary,
  fetchPlaces,
  setItineraries,
  saveItinerary,
}) => {
  const [location, setLocation] = useState("");

  const addPlaceToItinerary = (place) => {
    setItineraries((prevItineraries) =>
      prevItineraries.map((itin) =>
        itin.id === itinerary.id
          ? {
              ...itin,
              places: [...itin.places, place],
              searchResults: itin.searchResults.filter(
                (p) => p.id !== place.id
              ),
            }
          : itin
      )
    );
  };

  const removePlaceFromItinerary = (placeId) => {
    setItineraries((prevItineraries) =>
      prevItineraries.map((itin) =>
        itin.id === itinerary.id
          ? { ...itin, places: itin.places.filter((p) => p.id !== placeId) }
          : itin
      )
    );
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
        <button onClick={() => fetchPlaces(location, itinerary.id)}>
          Search Places
        </button>
      </div>

      <h3>Itinerary Places</h3>
      <ul>
        {itinerary.places.map((place) => (
          <li key={place.id}>
            {place.name} - {place.rating}
            <button
              className="delete-button"
              onClick={() => removePlaceFromItinerary(place.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Search Results</h3>
      <div className="searchitin-results">
        <ul>
          {itinerary.searchResults.length > 0 ? (
            itinerary.searchResults.map((place) => (
              <li key={place.id}>
                <img src={place.image_url} alt={place.name} width="50" />
                <strong>{place.name}</strong> - {place.rating}
                <p>{place.address}</p>
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

      <button
        className="save-button"
        onClick={() => saveItinerary(itinerary.id)}>
        Save
      </button>
    </div>
  );
};

export default CreateItineraryList;
