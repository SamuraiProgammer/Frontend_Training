import { useState, useRef, useEffect, useCallback } from "react";
import { CARDS } from "../constants/clientsData";


const GAP = 20; // px — keep in sync with the inline gap style

// ── Sub-components ───────────────────────────────────────────────────

function PhotoCard({ card }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-3xl group cursor-pointer flex-shrink-0"
      onClick={() => setActive(!active)} // 👈 mobile tap support
    >
      {/* Background image */}
      <img
        src={card.image}
        alt={card.name}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* Default gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
        transition-opacity duration-400 
        group-hover:opacity-0 ${active ? "opacity-0" : "opacity-100"}`}
      />

      {/* Name + Designation (Improved alignment) */}
      <div
        className={`absolute bottom-4 left-0 w-full px-6 z-10 
        transition-opacity duration-300 
        group-hover:opacity-0 ${active ? "opacity-0" : "opacity-100"}`}
      >
        <p className="text-[14px] font-semibold tracking-wide uppercase text-white leading-tight">
          {card.name}
        </p>
        <p className="text-[11px] text-white/80 tracking-wide uppercase mt-1">
          {card.Designation}
        </p>
      </div>

      {/* Hover / Tap overlay */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end p-6 
        bg-[#f5b932]/93 backdrop-blur-sm 
        transition-all duration-400
        ${
          active
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
        }`}
      >
        <blockquote className="text-[16px] leading-[1.5] text-[#1a1a2e] italic mb-4">
          {card.quote}
        </blockquote>

        <span className="text-[11px] font-bold tracking-[0.13em] uppercase text-[#1a1a2e]/70">
          {card.name}
        </span>
      </div>
    </div>
  );
}

// ── Main Carousel ────────────────────────────────────────────────────

export default function TestimonialCarousel() {
  const [VISIBLE, setVISIBLE] = useState(3);
  const photoCards = CARDS.filter(card => card.type === "photo");
  const total = photoCards.length;

  // Clone array for infinite loop: [...last VISIBLE, ...original, ...first VISIBLE]
 const allCards = [
  ...photoCards.slice(-VISIBLE),
  ...photoCards,
  ...photoCards.slice(0, VISIBLE),
];

  // Start pointing at the first real card (after prepended clones)
  const [position, setPosition] = useState(VISIBLE);
  const [animated, setAnimated] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  // Track dot active state separately (maps to 0–5)
  const realIndex = ((position - VISIBLE) % total + total) % total;

  const trackRef = useRef(null);
  const cardWidthRef = useRef(0);

  // Measure card width
  const measureCard = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const firstCard = track.children[0];
    if (firstCard) cardWidthRef.current = firstCard.getBoundingClientRect().width;
  }, []);

  useEffect(() => {
  const handleResize = () => {
    setTimeout(() => {
      measureCard();
    }, 50); // wait for layout to settle
  };

  measureCard();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [measureCard]);

 useEffect(() => {
  setAnimated(false);        // disable animation during reset
  setPosition(VISIBLE);      // reset to correct starting point

  const id = requestAnimationFrame(() => {
    setAnimated(true);       // re-enable animation smoothly
  });

  return () => cancelAnimationFrame(id);
}, [VISIBLE]);

  useEffect(() => {
  const handleResize = () => {
    let newVisible; // ✅ use let

    if (window.innerWidth < 640) {
      newVisible = 1;
    } else if (window.innerWidth < 1024) {
      newVisible = 2;
    } else {
      newVisible = 3;
    }

    setVISIBLE((prev) => {
      if (prev !== newVisible) {
        return newVisible;
      }
      return prev;
    });
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  // Compute translateX
  const getTranslate = (pos) => {
  const cw = cardWidthRef.current;

  if (!cw) return 0; // prevent NaN / blank render

  return -(pos * (cw + GAP));
};

  const move = (dir) => {
    if (isMoving) return;
    setIsMoving(true);
    setAnimated(true);
    setPosition((p) => p + dir);
  };

  // After transition ends, silently jump if on a clone
  const handleTransitionEnd = () => {
    setPosition((pos) => {
      let next = pos;
      if (pos <= VISIBLE - 1) {
        next = total + pos;
      } else if (pos >= total + VISIBLE) {
        next = pos - total;
      }
      if (next !== pos) {
        setAnimated(false);
        setTimeout(() => setIsMoving(false), 0);
        return next;
      }
      setIsMoving(false);
      return pos;
    });
  };

  // Re-enable animation after silent jump
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);
  

  const translateX = getTranslate(position);

  return (
    <section className="w-full bg-[white] py-20 px-5 flex flex-col items-center">{/**bg-[#f8f7f3] */}
      {/* Heading */}
      <p className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-3">
        OUR TEAM
      </p>
      <h2 className=" text-4xl text-[#1a1a2e] font-bold text-center leading-tight mb-14 max-w-md">
        Our Trainer Team
      </h2>

      {/* Track wrapper */}
      <div className="w-full max-w-6xl overflow-hidden">
        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${translateX}px)`,
            transition: animated ? "transform 0.55s cubic-bezier(0.65,0,0.35,1)" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {allCards.map((card, i) => (
            <div
              key={i}
              style={{ flex: `0 0 calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})` }}
              className="h-[540px]"
            >
              <PhotoCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-10">
        <button
          onClick={() => move(-1)}
          aria-label="Previous"
          className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-[#f5b932] flex items-center justify-center shadow-lg shadow-yellow-300/30 hover:bg-[#e0a820] active:scale-95 transition-all duration-150"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9L11 4" stroke="#1a1a2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={() => move(1)}
          aria-label="Next"
          className="w-[52px] h-[52px] rounded-full bg-[#f5b932] flex items-center justify-center shadow-lg shadow-yellow-300/30 hover:bg-[#e0a820] active:scale-95 transition-all duration-150"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="#1a1a2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-5">
        {photoCards.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === realIndex
                ? "w-5 h-2.5 bg-[#f5b932]"
                : "w-2.5 h-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}