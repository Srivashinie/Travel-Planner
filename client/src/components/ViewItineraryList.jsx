import React from "react";

const ViewItineraryList = ({ itinerary }) => {
  return (
    <div className="view-itinerary">
      <h3>{itinerary.name} (View Only)</h3>

      <h3>Itinerary Places</h3>
      <ul>
        {itinerary.places.length > 0 ? (
          itinerary.places.map((place) => (
            <li key={place.id}>
              {place.name} - {place.rating}
            </li>
          ))
        ) : (
          <p>No places added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default ViewItineraryList;
