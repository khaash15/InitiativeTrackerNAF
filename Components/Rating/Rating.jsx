import React, { useState } from "react";
import StarRating from "./StarRating";

const Rating = ({ setStarRating, starRating, val }) => {
  const [rating, setRating] = useState(0);

  const handleSelect = (selectedRating) => {
    if (selectedRating <= rating) {
      // If the selected rating is less than or equal to the current rating,
      // reset the rating to 0 (unselect all stars)
      setRating(0);
    } else {
      // Otherwise, set the rating to the selected value
      setStarRating(selectedRating);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <StarRating
          key={value}
          selected={value <= starRating}
          onSelect={() => handleSelect(value)}
        />
      ))}
    </div>
  );
};

export default Rating;
