import React from "react";
import { useNavigate } from "react-router-dom";

const PromotionalBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-6 py-10 flex justify-center items-center">
      <div
        className="w-full max-w-7xl rounded-4xl p-8 md:p-12 
        bg-[#e5fae7] 
        border border-white/10 backdrop-blur-lg 
        flex flex-col md:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_#9be8a8]"
      >
        {/* Left Content */}
        <div className="text-[#123333] max-w-xl">
          <p className="text-sm uppercase tracking-widest text-[#023d56] mb-2">
            Limited Time Offer
          </p>

          <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-4">
            2 Hour Preview of the Training
            <span className="block text-[#faad14] mt-1">
              Just ₹500
            </span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base">
            Get a hands-on experience of our premium training program. 
            Learn real-world skills before committing fully.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex-shrink-0">
          <button
            className="px-8 py-3 rounded-lg font-semibold text-[#000000] 
            bg-[#faad14] 
            hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30
            transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;