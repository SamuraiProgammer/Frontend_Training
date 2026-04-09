import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── Helper: map API response item → card shape ───────────────────────────────

function mapCourseToCard(item) {
  return {
    id: item._id,
    badge: item.badge,
    heading: item.heading,
    subheading: item.subheading,
    description: item.description,
    hours: item.hours.join(" | ")+"  Hours",
    benefits: item.benefits,
  };
}

// ─── Card Component ───────────────────────────────────────────────────────────

function ProgramCard({ card }) {
  const navigate = useNavigate();

  return (
    <div className="program-card">
      <div className="card-badge">{card.badge}</div>
      <h3 className="card-heading">{card.heading}</h3>
      <p className="card-subheading">{card.subheading}</p>
      <p className="card-description">{card.description}</p>
      <div className="card-hours">{card.hours}</div>
      <div className="card-meta">
        {card.benefits.map((benefit) => (
          <div className="card-meta-item" key={benefit._id}>
            {benefit.imageurl ? (
              <img
                src={benefit.imageurl}
                alt=""
                style={{ width: "1rem", height: "1rem", objectFit: "contain" }}
              />
            ) : (
              <span className="meta-icon">🎓</span>
            )}
            <span>{benefit.text}</span>
          </div>
        ))}
      </div>
      <div className="card-actions">
        <button
          className="btn-explore"
          onClick={() => navigate(`/explore-course/${card.id}`)}
        >
          Explore
        </button>
        <button
          className="btn-register"
          onClick={() => navigate(`/register`, { state: { heading: card.heading } })}
        >
          Register
        </button>
      </div>
    </div>
  );
}

// ─── Section Component ────────────────────────────────────────────────────────

function Section({ sectionRef, title, cards }) {
  return (
    <section ref={sectionRef} className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <span className="section-arrow">↗</span>
        <div className="section-line" />
      </div>
      <div className="cards-grid">
        {cards.map((card) => (
          <ProgramCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const ugRef = useRef(null);
  const pgRef = useRef(null);
  const ecRef = useRef(null);
  const topRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");

  const [ugCards, setUgCards] = useState([]);
  const [pgCards, setPgCards] = useState([]);
  const [ecCards, setEcCards] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ugRes, pgRes, ecRes] = await Promise.all([
          fetch("http://localhost:5000/api/course-detail/ug"),
          fetch("http://localhost:5000/api/course-detail/pg"),
          fetch("http://localhost:5000/api/course-detail/early-career"),
        ]);

        const [ugData, pgData, ecData] = await Promise.all([
          ugRes.json(),
          pgRes.json(),
          ecRes.json(),
        ]);

        if (ugData.success) setUgCards(ugData.data.map(mapCourseToCard));
        if (pgData.success) setPgCards(pgData.data.map(mapCourseToCard));
        if (ecData.success) setEcCards(ecData.data.map(mapCourseToCard));
      } catch (err) {
        console.error("Failed to fetch course data:", err);
      }
    };

    fetchAll();
  }, []);

  const scrollTo = (ref, tabName) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveTab(tabName);
  };

  return (
    <>
      <style>{`
        body {
          background: #ffffff;
          color: #1a1a2e;
          min-height: 100vh;
        }

        /* ── Page wrapper ── */
        .explore-page {
          max-width: 1200px;
          margin: 20px auto;
          padding: 0 16px 64px;
        }

        /* ── Hero Heading ── */
        .page-hero {
          padding: 48px 0 32px;
          text-align: center;
        }

        .page-hero h1 {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .page-hero h1 span {
          color: #faad14;
        }

        .page-hero p {
          margin-top: 12px;
          font-size: 0.95rem;
          color: #666;
          font-family: 'Arial', sans-serif;
        }

        /* ── Sticky Nav Buttons ── */
        .nav-tabs {
          position: sticky;
          top: 64px;
          z-index: 50;
          background: rgba(250, 248, 245, 0.92);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 12px 0;
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          border-bottom: 1px solid #e8e4f0;
          margin-bottom: 40px;
        }

        .nav-btn {
          font-size: 0.82rem;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 10px 10px 0 0;
          border-bottom: 2px solid #faad14;
          background: #fff;
          color: #000000;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          letter-spacing: 0.3px;
        }

        .nav-btn:hover {
          background: #faad14;
          color: #000000;
          border-color: #faad14;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(91, 79, 207, 0.3);
        }

        .nav-btn.active {
          background: #FAAD14;
          color: #1a1a2e;
          border-color: #FAAD14;
          box-shadow: 0 4px 14px rgba(240, 192, 64, 0.4);
        }

        /* ── Section ── */
        .section {
          margin-bottom: 64px;
          scroll-margin-top: 80px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .section-title {
          font-size: clamp(1.3rem, 3.5vw, 1.8rem);
          font-weight: 700;
          color: #1a1a2e;
          white-space: nowrap;
        }

        .section-arrow {
          font-size: 1.4rem;
          color: #faad14;
          font-weight: 700;
          flex-shrink: 0;
        }

        .section-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(to right, #5b4fcf33, transparent);
          border-radius: 2px;
        }

        /* ── Cards Grid ── */
        .cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 540px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── Card ── */
        .program-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 12px 16px rgba(91, 79, 207, 0.07);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .program-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(91, 79, 207, 0.14);
        }

        .card-badge {
          display: inline-block;
          background: #1a1a2e;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 7px 14px;
          border-radius: 50px;
          align-self: flex-start;
        }

        .card-heading {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1.25;
        }

        .card-subheading {
          font-size: 0.82rem;
          font-weight: 600;
          color: #faad14;
          letter-spacing: 0.2px;
        }

        .card-description {
          font-size: 0.87rem;
          color: #555;
          line-height: 1.6;
          flex: 1;
        }

        .card-hours {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1a1a2e;
          padding: 10px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }

        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Arial', sans-serif;
          font-size: 0.82rem;
          color: #444;
          font-weight: 600;
        }

        .meta-icon {
          font-size: 1rem;
        }

        /* ── Buttons ── */
        .card-actions {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .btn-explore,
        .btn-register {
          flex: 1;
          padding: 11px 0;
          border-radius: 8px;
          font-family: 'Arial', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }

        .btn-explore {
          background: #fff;
          color: #000000;
          border-color: #faad14;
        }

        .btn-explore:hover {
          background: #faad14;
          color: #000000;
        }

        .btn-register {
          background: #faad14;
          color: #000000;
          border-color: #faad14;
        }

        .btn-register:hover {
          background: #ffaa00;
          border-color: #ffaa00;
          box-shadow: 0 4px 12px rgba(91, 79, 207, 0.35);
        }

        /* ── Mobile tweaks ── */
        @media (max-width: 400px) {
          .nav-btn {
            font-size: 0.75rem;
            padding: 8px 14px;
          }
        }
      `}</style>

      <div className="explore-page" ref={topRef}>
        {/* Hero */}
        <div className="page-hero">
          <h1>
            Supervision &amp; <span>Mentorship</span>
          </h1>
          <p>Choose a programme that fits your stage and goals.</p>
        </div>

        {/* Sticky Nav */}
        <div className="nav-tabs">
          <button
            className={`nav-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => scrollTo(topRef, "all")}
          >
            All
          </button>
          <button
            className={`nav-btn ${activeTab === "ug" ? "active" : ""}`}
            onClick={() => scrollTo(ugRef, "ug")}
          >
            Undergraduate
          </button>
          <button
            className={`nav-btn ${activeTab === "pg" ? "active" : ""}`}
            onClick={() => scrollTo(pgRef, "pg")}
          >
            Postgraduate
          </button>
          <button
            className={`nav-btn ${activeTab === "ec" ? "active" : ""}`}
            onClick={() => scrollTo(ecRef, "ec")}
          >
            Early Career Professional
          </button>
        </div>

        {/* Undergraduate */}
        <Section sectionRef={ugRef} title="Undergraduate" cards={ugCards} />

        {/* Postgraduate */}
        <Section sectionRef={pgRef} title="Postgraduate" cards={pgCards} />

        {/* Early Career Professional */}
        <Section sectionRef={ecRef} title="Early Career Professional" cards={ecCards} />
      </div>
    </>
  );
}