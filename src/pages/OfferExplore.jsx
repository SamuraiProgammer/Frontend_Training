import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import img1 from "../assets/team/sumeet.png"
import img2 from "../assets/team/astha.jpg"
import img3 from "../assets/team/anwesha.jpg"

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5002/api";

const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

export default function OfferExplore() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/offers/${slug}`);
        setOffer(res.data.data);
      } catch (error) {
        console.error(error);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [slug]);

  const activeBatches = useMemo(
    () => (offer?.batches || []).filter((batch) => batch.isActive),
    [offer]
  );

  if (loading) {
    return <div className="px-6 py-32 text-center text-sm text-gray-600">Loading offer...</div>;
  }

  if (!offer) {
    return (
      <div className="px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Offer Not Found!!</h1>
        <p className="mt-3 text-sm text-gray-600">
          Currently Requested Preview Offer Is Not Available!!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f5] pb-20 pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#111111] via-[#1d1d1d] to-[#3a3124] p-8 text-white shadow-2xl md:p-12">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#FAAD14]">
              {offer.badge}
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              {offer.heroTitle}
            </h1>
            <p className="mt-5 text-base leading-7 text-white/80 md:text-lg">
              {offer.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Join for
                </div>
                <div className="mt-1 text-4xl font-bold text-[#FAAD14]">₹{offer.price}</div>
              </div>
              {offer.originalPrice ? (
                <div className="text-lg text-white/40 line-through">
                  ₹{offer.originalPrice}
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`/offers/${offer.slug}/register`)}
                className="rounded-2xl bg-[#FAAD14] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
              >
                {offer.buttonText || "Register Now"}
              </button>
              <button
                onClick={() => navigate("/explore")}
                className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Programmes
              </button>
            </div>
          </div>
        </div>
        
        {/* ── Orientation Session Detail ─────────────────────────────── */}
<section className="mt-8 space-y-6">

  {/* Intro header */}
  <div className="rounded-[32px] bg-white p-8 shadow-sm md:p-12">
    <div className="inline-flex rounded-full bg-[#FAAD14]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#FAAD14]">
      Orientation Session
    </div>
    <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
      Explore Before You Register
    </h2>
    <p className="mt-2 text-lg font-semibold text-gray-700">
      An Interactive Orientation for Future Interns at The Whole Point
    </p>
    <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
      This 2-hour immersive session is designed to help you understand not just what
      the internship offers, but how you will actually learn, grow, and practise within
      it. It's a transparent, experience-led walkthrough of our training philosophy,
      pedagogy, and clinical approach — so you can make an informed decision about
      your learning journey.
    </p>
  </div>

  {/* Section A */}
  <div className="rounded-[32px] bg-white p-8 shadow-sm">
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FAAD14] text-sm font-bold text-black">
        A
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">40 mins</p>
        <h3 className="text-xl font-bold text-gray-900">Meet the Team &amp; the Vision</h3>
      </div>
    </div>
    <p className="mt-4 text-sm leading-6 text-gray-600">
      Get to know the people and philosophy behind your learning experience.
    </p>

    <div className="mt-6 space-y-4">
      <div className="rounded-3xl bg-[#faf8f5] p-5">
        <h4 className="font-bold text-gray-900">Introduction to The Whole Point</h4>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Understanding our approach to mental health, training, and building
          practice-ready professionals.
        </p>
      </div>

      <div className="rounded-3xl bg-[#faf8f5] p-5">
        <h4 className="font-bold text-gray-900">Meet the Founders &amp; Core Team</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[
            { name: "Sumeet Singh", role: "Business & Technology", img: img1 },
            { name: "Astha Nagpal", role: "Clinical Leadership", img: img2 },
            { name: "Anwesha", role: "Training & Clinical Practice", img: img3 },
          ].map((person) => {
    const initials = person.name.split(" ").map((n) => n[0]).join("");
    return (
      <div
        key={person.name}
        className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-center"
      >
        {person.img ? (
          <img
            src={person.img}
            alt={person.name}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FAAD14]/15 text-sm font-bold text-[#b07d0a]">
            {initials}
          </div>
        )}
        <p className="text-sm font-bold text-gray-900">{person.name}</p>
        <p className="text-xs text-gray-500">{person.role}</p>
      </div>
    );
  })}
        </div>
      </div>

      <div className="rounded-3xl bg-[#faf8f5] p-5">
        <h4 className="font-bold text-gray-900">Trainer Introductions (Deep Dive)</h4>
        <p className="mt-1 text-sm text-gray-600">
          Each trainer brings a distinct lens to your learning:
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            { name: "Kanishka", duration: "15 mins", img: "https://corportal.s3.ap-south-1.amazonaws.com/upload/profilePic/0315edc18213127f8bbcc12a1c3ab7be.jpg" },
            { name: "Pratyakshi", duration: "15 mins", img: "https://corportal.s3.ap-south-1.amazonaws.com/upload/profilePic/f218ee1ef93ca0e858a6da3dac5eb38a.png" },
          ].map((trainer) => (
<div
      key={trainer.name}
      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4"
    >
      {trainer.img ? (
        <img
          src={trainer.img}
          alt={trainer.name}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAAD14]/15 text-sm font-bold text-[#b07d0a]">
          {trainer.name[0]}
        </div>
      )}
      <div>
        <p className="text-sm font-bold text-gray-900">{trainer.name}</p>
        <p className="text-xs text-gray-500">{trainer.duration}</p>
      </div>
    </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Section B */}
  <div className="rounded-[32px] bg-white p-8 shadow-sm">
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FAAD14] text-sm font-bold text-black">
        B
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">30 mins</p>
        <h3 className="text-xl font-bold text-gray-900">How You Will Actually Learn</h3>
      </div>
    </div>
    <p className="mt-2 text-xs text-gray-500">
      Led by Astha Nagpal, supported by Anwesha
    </p>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      This section breaks down how we bridge the gap between theory and real-world
      practice. You'll experience the structure that makes this internship hands-on,
      reflective, and clinically grounded.
    </p>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {[
        {
          title: "Role Plays & Case Simulations",
          desc: "Practise real-life therapeutic situations in a guided environment.",
        },
        {
          title: "Case Discussions & Presentations",
          desc: "Learn how to think, analyse, and present like a therapist.",
        },
        {
          title: "Client Audio/Video Exposure (consented)",
          desc: "Observe real therapeutic processes and interventions.",
        },
        {
          title: "Volunteer Client Sessions",
          desc: "Structured, supervised opportunities to engage with clients.",
        },
        {
          title: "Intergroup Reflection Spaces",
          desc: "Build self-awareness and reflective capacity.",
        },
        {
          title: "AI-Based Client Work",
          desc: "Practise with simulated clients to develop real-time clinical skills.",
        },
      ].map((item) => (
        <div key={item.title} className="rounded-3xl bg-[#faf8f5] p-5">
          <div className="mb-2 h-1.5 w-6 rounded-full bg-[#FAAD14]" />
          <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
          <p className="mt-1 text-sm leading-6 text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-4 rounded-3xl bg-[#faf8f5] p-5">
      <h4 className="font-bold text-gray-900">Fieldwork Across Settings</h4>
      <p className="mt-1 mb-3 text-sm text-gray-600">Exposure to diverse professional environments:</p>
      <div className="flex flex-wrap gap-2">
        {["Rehabilitation Centres", "Schools", "Juvenile Settings", "NGOs", "Corporate Spaces"].map(
          (setting) => (
            <span
              key={setting}
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700"
            >
              {setting}
            </span>
          )
        )}
      </div>
    </div>
  </div>

  {/* Section C */}
  <div className="rounded-[32px] bg-white p-8 shadow-sm">
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FAAD14] text-sm font-bold text-black">
        C
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">30 mins</p>
        <h3 className="text-xl font-bold text-gray-900">Building Your Clinical Acumen</h3>
      </div>
    </div>
    <p className="mt-2 text-xs text-gray-500">Led by Anwesha</p>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      Move beyond theory into how therapists actually think in real situations.
    </p>

    <div className="mt-6 space-y-3">
      {[
        {
          title: "Understanding Pre-Consultation Sessions",
          desc: "Learn from real experience of conducting 120+ calls.",
        },
        {
          title: "Identifying Psychological Themes",
          desc: "How to listen beyond words and spot underlying patterns.",
        },
        {
          title: "Developing Clinical Judgement",
          desc: "Moving from observation to interpretation.",
        },
        {
          title: "Client–Therapist Alignment (Matchmaking Process)",
          desc: "How we ensure the right therapist fit for each client.",
        },
      ].map((item) => (
        <div key={item.title} className="flex gap-4 rounded-3xl bg-[#faf8f5] p-5">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FAAD14]" />
          <div>
            <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
            <p className="mt-1 text-sm leading-6 text-gray-600">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Section D */}
  <div className="rounded-[32px] bg-white p-8 shadow-sm">
    <div className="flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FAAD14] text-sm font-bold text-black">
        D
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">20 mins</p>
        <h3 className="text-xl font-bold text-gray-900">Open Q&amp;A</h3>
      </div>
    </div>
    <p className="mt-2 text-xs text-gray-500">
      Led by Sumeet Singh, Astha Nagpal &amp; Anwesha
    </p>
    <p className="mt-3 text-sm leading-6 text-gray-600">
      A space for honest, unfiltered conversations. Ask anything about:
    </p>
    <div className="mt-4 flex flex-wrap gap-2">
      {[
        "Internship structure",
        "Learning outcomes",
        "Clinical exposure",
        "Career pathways",
        "Expectations & commitments",
      ].map((topic) => (
        <span
          key={topic}
          className="rounded-full border border-gray-200 bg-[#faf8f5] px-4 py-1.5 text-xs font-semibold text-gray-700"
        >
          {topic}
        </span>
      ))}
    </div>
  </div>

  {/* Bottom 3 cards */}
  <div className="grid gap-6 md:grid-cols-3">
    {[
      {
        label: "Who This Is For",
        points: [
          "Psychology students (UG/PG) exploring real-world practice",
          "Individuals looking for structured, supervised learning",
          "Those who want clarity before committing to an internship",
        ],
      },
      {
        label: "Why Attend This Session",
        intro:
          "Because choosing the right internship is not about joining — it's about fit. This session helps you understand:",
        points: [
          "How you will be trained",
          "What kind of exposure you will receive",
          "Whether this aligns with your goals",
        ],
      },
      {
        label: "What You Walk Away With",
        points: [
          "A clear understanding of the internship structure",
          "Insight into clinical training approaches",
          "Direct interaction with your potential mentors",
          "Clarity on your next steps",
        ],
      },
    ].map((card) => (
      <div key={card.label} className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{card.label}</p>
        {card.intro && (
          <p className="mt-3 text-sm leading-6 text-gray-600">{card.intro}</p>
        )}
        <ul className="mt-4 space-y-3">
          {card.points.map((pt) => (
            <li key={pt} className="flex gap-3 text-sm leading-6 text-gray-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FAAD14]" />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>

</section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Deliverables</p>
            {/* <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Explore button ke baad exactly kya show hoga
            </h2> */}
            <div className="mt-6 space-y-4">
              {(offer.deliverables || []).map((item) => (
                <div key={item._id} className="rounded-3xl border border-gray-100 p-5">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[32px] bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Available batches</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Upcoming slots</h2>
              <div className="mt-5 space-y-4">
                {activeBatches.length === 0 ? (
                  <p className="text-sm text-gray-600">No active batches right now.</p>
                ) : (
                  activeBatches.map((batch) => (
                    <div key={batch._id} className="rounded-3xl bg-[#faf8f5] p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{batch.title}</h3>
                          <p className="mt-2 text-sm text-gray-600">
                            {formatDateTime(batch.startAt)}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                            {batch.mode} {batch.venue ? `| ${batch.venue}` : ""}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-sm">
                          <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            Seats left
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {batch.availableSeats}
                          </div>
                        </div>
                      </div>
                      {batch.description ? (
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          {batch.description}
                        </p>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            </div>

            {offer.terms?.length > 0 && (
              <div className="rounded-[32px] bg-white p-8 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Terms</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">Important notes</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-gray-600">
                  {offer.terms.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#FAAD14]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
