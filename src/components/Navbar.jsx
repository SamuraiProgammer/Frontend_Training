import React from "react";
import Becoming from "../assets/BecomingBlack.png";

import { Link, useNavigate } from "react-router-dom";
import { navigateToFeaturedOfferRegistration } from "../utils/featuredOffer";

const Navbar = () => {
  const navigate = useNavigate();
  // const handleAuthClick = async () => {
  //   if (user) {
  //     await dispatch(logout());
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  const handleRegisterClick = async () => {
    await navigateToFeaturedOfferRegistration({ navigate });
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Becoming} alt="Becoming" className="h-40 w-auto" />
          {/* <Becoming className="h-16 w-auto" /> */}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8">

          {/* Login / Logout Button */}
          <button
            className="rounded-lg px-6 py-2.5 text-sm font-semibold cursor-pointer text-black bg-[#faad14] hover:bg-[#ffc53d]"
            onClick={handleRegisterClick}
          >
            {/* {user ? "Logout" : "Login"} */}
            Register
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
