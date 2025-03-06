import React from "react";

const ViewItineraryList = ({ itinerary }) => {
  return (
    <div className="view-itinerary">
      <h3 className="personal-itin">{itinerary.name} (View Only)</h3>

      <h3 className="personal-itin">Itinerary Places</h3>
      <ul>
        {itinerary.places.length > 0 ? (
          itinerary.places.map((place, index) => (
            <li key={index}>
              <strong>{place.name}</strong> - {place.address}{" "}
              {/* Displaying Address */}
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
