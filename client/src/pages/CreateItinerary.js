import React, { useState, useEffect } from "react";
import axios from "axios";
import ItineraryList from "../components/PersonalList";
import ViewItineraryList from "../components/ViewItineraryList";

const CreateItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [error, setError] = useState("");

  const createItinerary = (name) => {
    if (!name) {
      setError("Itinerary name cannot be empty.");
      return;
    }
    const newItinerary = {
      id: Date.now(),
      name,
      places: [],
      searchResults: [],
    };
    setItineraries([...itineraries, newItinerary]);
    setError("");
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
    const itinerary = itineraries.find((itin) => itin.id === id);

    axios
      .post("http://127.0.0.1:5000/api/place/save_itinerary", itinerary)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => console.error("Error saving itinerary:", error));
  };

  const deleteItinerary = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/api/place/delete_itinerary/${id}`
      );
      setItineraries((prevItineraries) =>
        prevItineraries.filter((itinerary) => itinerary.id !== id)
      );
      alert("Itinerary deleted successfully!");
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      alert("Failed to delete itinerary.");
    }
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/place/get_itineraries")
      .then((response) => setItineraries(response.data))
      .catch((error) => console.error("Error fetching itineraries:", error));
  }, []);

  return (
    <div className="container-createitin">
      <h1 className="personal-itin">Create Your Itinerary</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Itinerary Name"
          id="itinerary-name"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        <button
          className="personal-itin-button"
          onClick={() =>
            createItinerary(document.getElementById("itinerary-name").value)
          }>
          Create Itinerary
        </button>
      </div>

      <h2 className="personal-itin">Itineraries</h2>
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
              <button
                className="delete-button"
                onClick={() => deleteItinerary(itinerary.id)}>
                Delete
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

      {selectedItinerary &&
        viewMode &&
        itineraries.find((itin) => itin.id === selectedItinerary) && (
          <ViewItineraryList
            itinerary={itineraries.find(
              (itin) => itin.id === selectedItinerary
            )}
          />
        )}
    </div>
  );
};

export default CreateItinerary;
