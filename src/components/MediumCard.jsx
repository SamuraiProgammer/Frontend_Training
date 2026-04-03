import React from "react";

const MediumCard = ({ card }) => {
  return (
    <div className="min-w-[280px] bg-white rounded-xl shadow-md p-4">
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-[160px] object-cover rounded-lg"
      />

      <h3 className="text-lg font-bold mt-3">{card.title}</h3>

      <p className="text-sm text-gray-600 mt-1">
        {card.subcategory} • {card.level}
      </p>

      <p className="text-sm mt-1">
        Mode: {card.mode.join(" / ")}
      </p>

      <p className="text-sm mt-1">
        Duration: {card.duration} hrs
      </p>

      <p className="font-bold mt-2">₹ {card.price}</p>

      <button className="mt-3 w-full bg-black text-white py-2 rounded-lg">
        Explore
      </button>
    </div>
  );
};

export default MediumCard;