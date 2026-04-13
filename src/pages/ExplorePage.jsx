import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const mapCourseToCard = (item) => ({
  id: item._id,
  badge: item.badge,
  heading: item.heading,
  subheading: item.subheading,
  description: item.description,
  hours: item.hours.join(" | ") + " Hours",
  benefits: item.benefits,
});

function PreviewOfferCard({ offer }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-[28px] bg-[#111111] p-6 text-white shadow-xl">
      <div className="flex h-full flex-col justify-between gap-5">
        <div>
          <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#FAAD14]">
            {offer.badge}
          </div>
          <h3 className="mt-5 text-2xl font-bold leading-tight">{offer.cardTitle}</h3>
          <p className="mt-2 text-sm font-semibold text-[#FAAD14]">{offer.cardSubtitle}</p>
          <p className="mt-4 text-sm leading-7 text-white/75">{offer.cardDescription}</p>
        </div>

        <div>
          <div className="rounded-3xl bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">Starting at</div>
            <div className="mt-2 text-3xl font-bold">₹{offer.price}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">
              {offer.batches?.length || 0} active batches
            </div>
          </div>

          {offer.highlights?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {offer.highlights.slice(0, 3).map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex gap-3">
            <button
              className="flex-1 rounded-2xl border border-[#FAAD14] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#FAAD14] hover:text-black"
              onClick={() => navigate(`/offers/${offer.slug}`)}
            >
              Explore
            </button>
            <button
              className="flex-1 rounded-2xl bg-[#FAAD14] px-4 py-3 text-sm font-bold text-black transition hover:opacity-90"
              onClick={() => navigate(`/offers/${offer.slug}/register`)}
            >
              {offer.buttonText || "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgramCard({ card, featuredOfferSlug }) {
  const navigate = useNavigate();

  const handleRegister = () => {
    if (featuredOfferSlug) {
      navigate(`/offers/${featuredOfferSlug}/register`, {
        state: { sourceCourseTitle: card.heading },
      });
      return;
    }

    navigate(`/register`, { state: { heading: card.heading } });
  };

  return (
    <div className="rounded-[24px] bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="inline-flex rounded-full bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
        {card.badge}
      </div>
      <h3 className="mt-4 text-xl font-bold leading-tight text-gray-900">{card.heading}</h3>
      <p className="mt-2 text-sm font-semibold text-[#FAAD14]">{card.subheading}</p>
      <p className="mt-3 text-sm leading-6 text-gray-600">{card.description}</p>

      <div className="mt-4 border-y py-3 text-sm font-bold text-gray-900">{card.hours}</div>

      <div className="mt-4 space-y-2">
        {card.benefits.map((benefit) => (
          <div key={benefit._id} className="flex items-center gap-3 text-sm font-medium text-gray-600">
            <span className="text-base">🎓</span>
            <span>{benefit.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <button
          className="flex-1 rounded-2xl border border-[#FAAD14] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#FAAD14]"
          onClick={() => navigate(`/explore-course/${card.id}`)}
        >
          Explore
        </button>
        <button
          className="flex-1 rounded-2xl bg-[#FAAD14] px-4 py-3 text-sm font-bold text-black transition hover:opacity-90"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}

function Section({ sectionRef, title, cards, featuredOfferSlug }) {
  return (
    <section ref={sectionRef} className="mb-16 scroll-mt-28">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="whitespace-nowrap text-2xl font-bold text-gray-900">{title}</h2>
        <span className="text-xl font-bold text-[#FAAD14]">↗</span>
        <div className="h-[2px] flex-1 rounded bg-gradient-to-r from-[#5b4fcf33] to-transparent" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <ProgramCard
            key={card.id}
            card={card}
            featuredOfferSlug={featuredOfferSlug}
          />
        ))}
      </div>
    </section>
  );
}

export default function ExplorePage() {
  const ugRef = useRef(null);
  const pgRef = useRef(null);
  const ecRef = useRef(null);
  const topRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");
  const [ugCards, setUgCards] = useState([]);
  const [pgCards, setPgCards] = useState([]);
  const [ecCards, setEcCards] = useState([]);
  const [offers, setOffers] = useState([]);
  const {titleData} = useParams();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ugRes, pgRes, ecRes, offersRes] = await Promise.all([
          axios.get(`${apiUrl}/course-detail/ug`),
          axios.get(`${apiUrl}/course-detail/pg`),
          axios.get(`${apiUrl}/course-detail/early-career`),
          axios.get(`${apiUrl}/offers`).catch(() => ({ data: { data: [] } })),
        ]);

        setUgCards((ugRes.data.data || []).map(mapCourseToCard));
        setPgCards((pgRes.data.data || []).map(mapCourseToCard));
        setEcCards((ecRes.data.data || []).map(mapCourseToCard));
        setOffers(offersRes.data.data || []);
      } catch (error) {
        console.error("Failed to fetch explore data:", error);
      }
    };

    fetchAll();
  }, []);

  const featuredOfferSlug =
    offers.find((offer) => offer.isFeatured)?.slug || offers[0]?.slug || "";

  const scrollTo = (ref, tabName) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveTab(tabName);
  };

  return (
    <div className="bg-white pt-20" ref={topRef}>
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            {/* Supervision & <span className="text-[#FAAD14]">Mentorship</span> */}
            {titleData}
          </h1>
          {/* <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Regular programmes ke saath live preview offers bhi available hain. Admin jo active
            karega, wahi yahan dynamic tarike se show hoga.
          </p> */}
        </div>

        {offers.length > 0 && (
          <section className="mb-14">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Live Preview Offers
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {offers.map((offer) => (
                <PreviewOfferCard key={offer._id} offer={offer} />
              ))}
            </div>
          </section>
        )}

        <div className="sticky top-16 z-40 mb-10 flex flex-wrap justify-center gap-3 border-b border-[#e8e4f0] bg-white/95 py-4 backdrop-blur">
          {[
            { label: "All", value: "all", ref: topRef },
            { label: "Undergraduate", value: "ug", ref: ugRef },
            { label: "Postgraduate", value: "pg", ref: pgRef },
            { label: "Early Career Professional", value: "ec", ref: ecRef },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => scrollTo(tab.ref, tab.value)}
              className={`rounded-t-xl border-b-2 px-5 py-3 text-sm font-semibold transition ${
                activeTab === tab.value
                  ? "border-[#FAAD14] bg-[#FAAD14] text-black"
                  : "border-[#FAAD14] bg-white text-black hover:bg-[#FAAD14]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Section
          sectionRef={ugRef}
          title="Undergraduate"
          cards={ugCards}
          featuredOfferSlug={featuredOfferSlug}
        />
        <Section
          sectionRef={pgRef}
          title="Postgraduate"
          cards={pgCards}
          featuredOfferSlug={featuredOfferSlug}
        />
        <Section
          sectionRef={ecRef}
          title="Early Career Professional"
          cards={ecCards}
          featuredOfferSlug={featuredOfferSlug}
        />
      </div>
    </div>
  );
}
