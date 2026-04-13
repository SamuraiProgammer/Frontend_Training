import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchFeaturedOffer = async () => {
  const res = await axios.get(`${apiUrl}/offers/featured`);
  return res.data?.data || null;
};

export const navigateToFeaturedOfferRegistration = async ({
  navigate,
  sourceCourseTitle = "",
  fallbackHeading = "2 Hour Preview of the Training @ Just ₹500",
}) => {
  try {
    const offer = await fetchFeaturedOffer();

    if (offer?.slug) {
      navigate(`/offers/${offer.slug}/register`, {
        state: sourceCourseTitle ? { sourceCourseTitle } : undefined,
      });
      return true;
    }
  } catch (error) {
    console.error("Featured offer fetch failed", error);
  }

  navigate("/register", { state: { heading: fallbackHeading, forceLegacy: true } });
  return false;
};
