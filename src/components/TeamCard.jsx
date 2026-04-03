import { useState } from "react";
import { AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";


export default function TrainerCard({
  img,
  name,
  role,
  designation,
  description,
}) {
  const [expanded, setExpanded] = useState(false);

  const maxLength = 50; // characters before truncation
  const isLong = description && description.length > maxLength;

  const shortText = isLong
    ? description.slice(0, maxLength) + "..."
    : description;

  return (
    <div className="rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300">
      
      {/* Image */}
      <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-gray-200 mb-4">
        {img ? (
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xl font-semibold">
            {name ? name.charAt(0).toUpperCase() : "?"}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 text-center">
        {name}
      </h3>

      {/* Role */}
      {role && (
        <p className="text-xs text-purple-600 font-semibold mt-1 text-center uppercase">
          {role}
        </p>
      )}

      {/* Designation */}
      {designation && (
        <p className="text-sm text-gray-700 font-semibold mt-2 text-center">
          {designation}
        </p>
      )}

      {/* Description with Read More */}
      {description && (
        <p className="text-sm text-gray-500 mt-3 text-center">
          {expanded ? description : shortText}

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 text-purple-600 font-semibold hover:underline"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
      )}
    </div>
  );
}