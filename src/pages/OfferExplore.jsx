import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
        <h1 className="text-2xl font-bold text-gray-900">Offer not found</h1>
        <p className="mt-3 text-sm text-gray-600">
          Requested preview offer abhi available nahi hai.
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

        {offer.highlights?.length > 0 && (
          <section className="mt-8 rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Why this offer
                </p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">What users get in this flow</h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {offer.highlights.map((item, index) => (
                <div key={`${item}-${index}`} className="rounded-3xl bg-[#faf8f5] p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FAAD14] text-sm font-bold text-black">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold leading-6 text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Deliverables</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Explore button ke baad exactly kya show hoga
            </h2>
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
