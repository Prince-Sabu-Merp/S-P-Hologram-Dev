import React, { useState } from "react";
import orangeStar from "../assets/orange.svg";
import whiteStar from "../assets/white.svg";

const RatingCard = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    
    <div className="m-[38px] p-6 flex justify-center items-center w-full min-h-[539px]">
      <div
        className="text-white rounded-2xl w-[750px] h-[221px] p-6 shadow-lg flex flex-col items-center"
        style={{
          backgroundColor: "#2D13EA",
          boxShadow: "-15px 50px 32px rgba(0,0,0,0.25)",
        }}
      >
        <h2 className="text-[36px] font-semibold mb-4">Rate your Experience</h2>
        <div className="flex space-x-[25px]">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= (hover || rating);
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className="focus:outline-none w-12 h-12 cursor-pointer"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <img
                  src={isFilled ? orangeStar : whiteStar}
                  alt={isFilled ? "Filled star" : "Empty star"}
                  className="w-12 h-12 select-none"
                  draggable="false"
                />
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm">
          {rating > 0
            ? `You rated ${rating} star${rating > 1 ? "s" : ""}`
            : "Click a star to rate your experience"}
        </p>
    
    </div>
    </div>
  );
};

export default RatingCard;