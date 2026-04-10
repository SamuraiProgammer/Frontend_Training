import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFeaturedOffer, navigateToFeaturedOfferRegistration } from "../utils/featuredOffer";

const FooterBanner = () => {
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const loadOffer = async () => {
      try {
        const featured = await fetchFeaturedOffer();
        setOffer(featured);
      } catch (error) {
        console.error("Failed to load footer offer", error);
      }
    };

    loadOffer();
  }, []);

  return (
    <div className="sticky bottom-4 z-40 w-full px-4 py-5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/80 px-6 py-4 shadow-lg backdrop-blur-xl sm:flex-row">
        <div className="text-center sm:text-left">
          <h2 className="text-sm font-bold text-gray-900 sm:text-lg md:text-xl">
            {offer?.cardTitle || "Explore Before You Enroll"}{" "}
            <span className="text-[#faad14]">@ ₹{offer?.price || 500}</span>
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            className="cursor-pointer rounded-lg bg-[#faad14] px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-md"
            onClick={() => navigateToFeaturedOfferRegistration({ navigate })}
          >
            {offer?.buttonText || "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
