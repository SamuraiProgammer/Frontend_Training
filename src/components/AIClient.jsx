import React from "react";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { Link } from "react-router-dom";
import ComingSoon from "./ComingSoon";

const AIClient = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f0f9ff]">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200/30 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 flex flex-col md:flex-row items-center gap-12">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">
          
          {/* Badge */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full 
            border border-yellow-200 bg-yellow-50 text-yellow-700 
            hover:bg-yellow-100 px-4 py-1.5 text-xs font-semibold 
            transition"
          >
            🚀 Coming Soon
            <span className="font-bold">Feature under development</span>
          </Link>

          {/* Heading */}
          <h1
            className="mt-6 text-[40px] md:text-[36px] 
            font-extrabold leading-tight text-gray-900"
          >
            AI Client Simulations for{" "}
            <span className="text-[#faad14]">
              Therapist Formation
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-gray-600 max-w-xl text-base sm:text-lg">
            Engage with intelligent clients designed to help you practice
            counselling skills, navigate layered scenarios, and receive
            structured, supervision-informed feedback.
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Link
              to="/"
              className="px-8 py-3 rounded-lg font-semibold text-[#000000] 
              bg-[#faad14]
              hover:scale-105 hover:shadow-lg hover:shadow-purple-300/40
              transition-all duration-300"
            >
              Explore
            </Link>
          </div>
        </div>

        {/* RIGHT VIDEO */}
        <div className="flex-1 w-full">
          <div
            className="relative rounded-3xl p-[1px] 
            bg-gradient-to-br from-purple-300/40 to-cyan-300/40"
          >
            <div className="rounded-3xl bg-white p-4 shadow-lg">

              <CustomVideoPlayer />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIClient;