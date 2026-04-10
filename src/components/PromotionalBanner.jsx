import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFeaturedOffer, navigateToFeaturedOfferRegistration } from "../utils/featuredOffer";

const PromotionalBanner = () => {
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const loadOffer = async () => {
      try {
        const featured = await fetchFeaturedOffer();
        setOffer(featured);
      } catch (error) {
        console.error("Failed to load featured offer", error);
      }
    };

    loadOffer();
  }, []);

  const heading = offer?.cardTitle || "2 Hour Preview of the Training";
  const price = offer?.price || 500;
  const description =
    offer?.cardDescription ||
    "Get a hands-on experience of our premium training program. Learn real-world skills before committing fully.";

  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-6 rounded-[2rem] border border-white/10 bg-[#e5fae7] p-8 shadow-[8px_8px_0px_#9be8a8] md:flex-row md:p-12">
        <div className="max-w-xl text-[#123333]">
          <p className="mb-2 text-sm uppercase tracking-widest text-[#023d56]">
            Limited Time Offer
          </p>

          <h2 className="mb-4 text-2xl font-bold leading-snug md:text-4xl">
            {heading}
            <span className="mt-1 block text-[#faad14]">Just ₹{price}</span>
          </h2>

          <p className="text-sm text-gray-600 md:text-base">{description}</p>
        </div>

        <div className="flex-shrink-0">
          <button
            className="cursor-pointer rounded-lg bg-[#faad14] px-8 py-3 font-semibold text-[#000000] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
            onClick={() => navigateToFeaturedOfferRegistration({ navigate })}
          >
            {offer?.buttonText || "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
