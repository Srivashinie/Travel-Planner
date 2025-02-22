import React, { useState } from "react";
import axios from "axios";
import ItineraryList from "../components/PersonalList";
import ViewItineraryList from "../components/ViewItineraryList";

const CreateItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [viewMode, setViewMode] = useState(false);

  const createItinerary = (name) => {
    if (!name) return;
    const newItinerary = {
      id: Date.now(),
      name,
      places: [],
      searchResults: [],
    };
    setItineraries([...itineraries, newItinerary]);
  };

  const fetchPlaces = async (query, itineraryId) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/place/search_places",
        {
          params: { query },
        }
      );

      setItineraries((prevItineraries) =>
        prevItineraries.map((itin) =>
          itin.id === itineraryId
            ? { ...itin, searchResults: response.data }
            : itin
        )
      );
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const saveItinerary = (id) => {
    alert(
      `Itinerary "${itineraries.find((itin) => itin.id === id).name}" saved!`
    );
  };

  return (
    <div className="container-createitin">
      <h1>Create Your Itinerary</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Itinerary Name"
          id="itinerary-name"
        />
        <button
          onClick={() =>
            createItinerary(document.getElementById("itinerary-name").value)
          }>
          Create Itinerary
        </button>
      </div>

      <h2>Itineraries</h2>
      <div className="searchitin-results">
        <ul>
          {itineraries.map((itinerary) => (
            <li key={itinerary.id}>
              <strong>{itinerary.name}</strong>
              <button
                className="modify-button"
                onClick={() => {
                  setSelectedItinerary(itinerary.id);
                  setViewMode(false);
                }}>
                Add/Modify
              </button>
              <button
                className="view-button"
                onClick={() => {
                  setSelectedItinerary(itinerary.id);
                  setViewMode(true);
                }}>
                View
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedItinerary && !viewMode && (
        <ItineraryList
          itinerary={itineraries.find((itin) => itin.id === selectedItinerary)}
          fetchPlaces={fetchPlaces}
          setItineraries={setItineraries}
          saveItinerary={saveItinerary}
        />
      )}

      {selectedItinerary && viewMode && (
        <ViewItineraryList
          itinerary={itineraries.find((itin) => itin.id === selectedItinerary)}
        />
      )}
    </div>
  );
};

export default CreateItinerary;
