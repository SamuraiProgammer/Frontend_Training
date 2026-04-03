import React from "react";

const CardCarousel = ({ children }) => {
  return (
    <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
      {children}
    </div>
  );
};

export default CardCarousel;