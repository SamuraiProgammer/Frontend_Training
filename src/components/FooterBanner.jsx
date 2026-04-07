import React from "react";
import {useNavigate} from "react-router-dom"

const FooterBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full sticky bottom-4 z-40 py-5 px-4">
      
      <div className="max-w-5xl mx-auto rounded-2xl border border-gray-200 
        bg-white/80 backdrop-blur-xl shadow-lg px-6 py-4 
        flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Text */}
        <div className="text-center sm:text-left">

          <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">
            Explore Before You Enroll{" "}
            <span className="text-[#faad14]">
              @ ₹500
            </span>
          </h2>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-lg text-sm font-semibold text-black 
            bg-[#faad14] cursor-pointer
            hover:scale-105 hover:shadow-md transition-all duration-300" onClick={() => navigate("/register", { state: { heading: "Explore Before You Enroll @ 500" } })}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
