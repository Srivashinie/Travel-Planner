import React from "react";
import default_hotel_img from "../assets/images/hotel-image.jpg";
import default_hotel_img2 from "../assets/images/hotel-image2.jpg";
import default_hotel_img3 from "../assets/images/hotel-image3.jpg";

const defaultImages = [
  default_hotel_img,
  default_hotel_img2,
  default_hotel_img3,
];

const checkImageExists = (url) => {
  return new Promise((resolve) => {
    if (!url || url.trim() === "") {
      resolve(false);
      return;
    }
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

const getValidImage = async (hotel) => {
  if (!hotel.images || hotel.images.length === 0) {
    return getRandomDefaultImage();
  }

  for (const img of hotel.images) {
    if (img?.thumbnail?.trim()) {
      const isValid = await checkImageExists(img.thumbnail);
      if (isValid) return img.thumbnail;
    }
  }

  return getRandomDefaultImage();
};

const getRandomDefaultImage = () => {
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

const HotelDetails = ({ hotel }) => {
  const [imageSrc, setImageSrc] = React.useState(default_hotel_img);

  React.useEffect(() => {
    const fetchImage = async () => {
      const validImage = await getValidImage(hotel);
      setImageSrc(validImage);
    };
    fetchImage();
  }, [hotel]);

  return (
    <div className="hotel-card">
      <img src={imageSrc} alt="Hotel" className="hotel-image" />
      <div className="card-content">
        <h3>
          <strong>{hotel.name}</strong>
        </h3>
        <p>
          <strong>Price: </strong>
          {hotel.total_rate?.lowest || "Price not available"}
        </p>
        <p>
          <strong>Ratings: </strong>
          {hotel.overall_rating || "Ratings not available"}
        </p>
        <a
          href={hotel.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hotel-link"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default HotelDetails;
