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
    <div className="flex w-full items-center justify-center px-6 py-4">
  <div className="relative flex w-full max-w-7xl flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#ecfdf5] via-[#f0fdf4] to-[#dcfce7] p-8 shadow-[0_10px_10px_-10px_rgba(0,0,0,0.15)] backdrop-blur-xl md:flex-row md:p-12">

    {/* subtle glow */}
    <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#86efac]/30 blur-3xl"></div>

    <div className="relative max-w-xl text-[#0f2f2f]">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0284c7]">
        Limited Time Offer
      </p>

      <h2 className="mb-5 text-3xl font-bold leading-tight md:text-5xl">
        {heading}
        <span className="mt-2 block text-2xl font-semibold text-[#f59e0b] md:text-3xl">
          Just ₹{price}
        </span>
      </h2>

      <p className="text-sm leading-relaxed text-gray-600 md:text-base">
        {description}
      </p>
    </div>

    <div className="relative flex flex-col gap-4 md:flex-row">
      <button
        className="group relative overflow-hidden rounded-xl cursor-pointer bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] px-8 py-3 font-semibold text-black shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
        onClick={() =>
          navigateToFeaturedOfferRegistration({ navigate })
        }
      >
        <span className="relative z-10">
          {offer?.buttonText || "Register Now"}
        </span>
        <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100"></span>
      </button>

      <button
        className="rounded-xl border cursor-pointer border-gray-300 bg-white/70 px-8 py-3 font-semibold text-gray-800 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg"
        onClick={() => navigate(`/offers/${offer.slug}`)}
      >
        Explore
      </button>
    </div>
  </div>
</div>
  );
};

export default PromotionalBanner;
