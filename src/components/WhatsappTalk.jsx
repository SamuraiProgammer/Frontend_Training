import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappTalk({ phoneNumber, message, tooltip = "Chat with us on WhatsApp", position="fixed bottom-[50%] right-0 z-50", useBy="" }) {
  const [hovered, setHovered] = useState(false);
  const encodedMessage = encodeURIComponent(message || "Hello!");
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;

  return (
    <div 
      className={`${useBy==="Footer"?position:""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      {/* {hovered && (
        <div className="
          absolute bottom-full right-1/2 translate-x-1/2 mb-2
          px-3 py-1 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap
          z-50
        ">
          {tooltip}
        </div>
      )} */}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative
          bg-green-500 hover:bg-green-600
          text-white
          p-2 rounded-tl-md rounded-bl-md
          shadow-lg flex items-center justify-center
          transition-all
        "
      >
        <FaWhatsapp size={20} />Chat
      </a>
    </div>
  );
}
