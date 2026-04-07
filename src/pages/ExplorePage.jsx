import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Card Data ────────────────────────────────────────────────────────────────

const undergraduateCards = [
  {
    id: "6937bf9bb48964fa977992aa",
    badge: "Supervision & Training Based",
    heading: "Mentorship and Training",
    subheading: "Clinical & Counselling Psychology",
    description:
      "Gain hands-on experience in psychological assessments, case history taking, and therapeutic techniques. Develop practical skills under expert supervision to kickstart your career in clinical psychology.",
    hours: "60 | 90 | 120 | 240 Hours",
  },
  {
    id: "ug-2",
    badge: "Supervision & Training Based",
    heading: "Mentorship and Training",
    subheading: "Organizational Psychology",
    description:
      "Explore the intersection of psychology and the workplace. Learn assessment tools, HR practices, and behavioural strategies under the guidance of seasoned organizational psychologists.",
    hours: "60 | 90 | 120 | 240 Hours",
  },
  // {
  //   id: "ug-3",
  //   badge: "Supervision & Practical Based",
  //   heading: "Supervision and Practical",
  //   subheading: "Professional Mentorship and Supervision Programme",
  //   description:
  //     "Gain hands-on experience in psychological assessments, case history taking, and therapeutic techniques. Develop practical skills under expert supervision to kickstart your career in clinical psychology.",
  //   hours: "60 | 90 | 120 | 240 Hours",
  // },
];

const postgraduateCards = [
  {
    id: "pg-1",
    badge: "Advanced Clinical Training",
    heading: "Advanced Clinical Practice",
    subheading: "Clinical & Counselling Psychology",
    description:
      "Deepen your clinical expertise with advanced assessment techniques, evidence-based therapies, and complex case formulation. Supervised practice in real clinical environments.",
    hours: "120 | 180 | 240 Hours",
  },
  {
    id: "pg-2",
    badge: "Research & Practice",
    heading: "Research and Applied Psychology",
    subheading: "Organizational & Industrial Psychology",
    description:
      "Bridge research and practice in organizational settings. Master psychometric tools, leadership assessments, and strategic HR interventions under expert mentorship.",
    hours: "120 | 180 | 240 Hours",
  },
  {
    id: "pg-3",
    badge: "Supervision Based",
    heading: "Supervised Clinical Internship",
    subheading: "Neuropsychology & Rehabilitation",
    description:
      "Work alongside neuropsychologists in clinical settings to assess and rehabilitate patients. Gain practical skills in cognitive assessments and intervention planning.",
    hours: "120 | 240 Hours",
  },
  {
    id: "pg-4",
    badge: "Training & Mentorship",
    heading: "Mentorship and Training",
    subheading: "Child & Adolescent Psychology",
    description:
      "Specialize in working with children and adolescents. Learn developmental assessments, play therapy techniques, and school-based interventions under qualified supervision.",
    hours: "60 | 90 | 120 | 240 Hours",
  },
  {
    id: "pg-5",
    badge: "Supervision & Practical Based",
    heading: "Supervision and Practical",
    subheading: "Professional Supervision Programme",
    description:
      "An intensive mentorship programme designed for postgraduate students seeking structured supervision hours. Fulfil your supervision requirements with certified professionals.",
    hours: "60 | 90 | 120 | 240 Hours",
  },
];

const earlyCareerCards = [
  // {
  //   id: "ec-1",
  //   badge: "Career Development",
  //   heading: "Professional Mentorship",
  //   subheading: "Clinical & Counselling Psychology",
  //   description:
  //     "Transition from student to practitioner with confidence. Receive one-on-one mentorship, case discussion support, and professional guidance from experienced clinicians.",
  //   hours: "60 | 90 | 120 | 240 Hours",
  // },
  // {
  //   id: "ec-2",
  //   badge: "Skills Enhancement",
  //   heading: "Practice Building Workshop",
  //   subheading: "Private Practice & Entrepreneurship",
  //   description:
  //     "Learn how to set up and grow your private psychology practice. Covers ethics, documentation, marketing, and financial management for early career professionals.",
  //   hours: "30 | 60 Hours",
  // },
  // {
  //   id: "ec-3",
  //   badge: "Supervision Based",
  //   heading: "Supervised Case Consultation",
  //   subheading: "Organizational Psychology",
  //   description:
  //     "Receive structured supervision for your early professional casework in organizational contexts. Develop confidence in assessments, coaching, and workplace interventions.",
  //   hours: "60 | 90 | 120 Hours",
  // },
  // {
  //   id: "ec-4",
  //   badge: "Training & Mentorship",
  //   heading: "Mentorship and Training",
  //   subheading: "Child & Adolescent Therapy",
  //   description:
  //     "Enhance your skills in child psychology practice with targeted mentorship from specialists. Work through real case scenarios with guided supervision and feedback.",
  //   hours: "60 | 90 | 120 | 240 Hours",
  // },
  {
    id: "ec-4",
    badge: "Supervision & Practical Based",
    heading: "Professional Mentorship and Supervision Programme",
    subheading: "Professional Supervision Programme",
    description:
      "Designed for early career professionals who need supervised hours for licensure or certification. Fulfil your requirements with globally accepted, certified supervision.",
    hours: "60 | 90 | 120 | 240 Hours",
  },
  {
    id: "ec-5",
    badge: "Mentorship & Training",
    heading: "Bussiness Side of Therapy",
    subheading: "Child & Adolescent Therapy",
    description:
      "Enhance your skills in child psychology practice with targeted mentorship from specialists. Work through real case scenarios with guided supervision and feedback.",
    hours: "60 | 90 | 120 | 240 Hours",
  },
];

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
        <div className="card-meta-item">
          <span className="meta-icon">🎓</span>
          <span>With Completion Certification</span>
        </div>
        <div className="card-meta-item">
          <span className="meta-icon">🌐</span>
          <span>Globally Accepted Program</span>
        </div>
      </div>
      <div className="card-actions">
        <button
          className="btn-explore"
          onClick={() => navigate(`/explore-course/${card.id}`)}
        >
          Explore
        </button>
        <button className="btn-register" onClick={() => navigate(`/register`)}>
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
          // border: 1px solid #ede9f8;
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
        <Section
          sectionRef={ugRef}
          title="Undergraduate"
          cards={undergraduateCards}
        />

        {/* Postgraduate */}
        <Section
          sectionRef={pgRef}
          title="Postgraduate"
          cards={postgraduateCards}
        />

        {/* Early Career Professional */}
        <Section
          sectionRef={ecRef}
          title="Early Career Professional"
          cards={earlyCareerCards}
        />
      </div>
    </>
  );
}
