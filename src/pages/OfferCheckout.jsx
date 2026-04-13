import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadRazorpay } from "../utils/loadRazorpay";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

const academicPrograms = [
  "Undergraduate",
  "Postgraduate",
  "Early Career Professional",
  "Other",
];

const stepTitles = [
  "Personal Information",
  "Batch Selection",
  "Review & Payment",
];

export default function OfferCheckout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [offer, setOffer] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_no: "",
    college: "",
    currentAcademicProgram: "",
  });

  const sourceCourseTitle = location.state?.sourceCourseTitle || "";

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/offers/${slug}`);
        setOffer(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Offer load nahi hua");
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [slug]);

  const availableBatches = useMemo(
    () =>
      (offer?.batches || []).filter(
        (batch) => batch.isActive && !batch.isSoldOut
      ),
    [offer]
  );

  const selectedBatch = useMemo(
    () => availableBatches.find((batch) => batch._id === selectedBatchId),
    [availableBatches, selectedBatchId]
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStepOne = () => {
    if (!form.name.trim()) return "Name is Required";
    if (!form.email.trim()) return "Email is Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return "Valid email enter karo";
    }
    if (!form.phone_no.trim()) return "Phone number is Required";
    if (!form.college.trim()) return "College is Required";
    if (!form.currentAcademicProgram.trim()) return "Academic program is Required";
    return null;
  };

  const goToNextStep = () => {
    if (step === 1) {
      const error = validateStepOne();
      if (error) {
        toast.error(error);
        return;
      }
    }

    if (step === 2 && !selectedBatchId) {
      toast.error("Please select a batch");
      return;
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleVerify = async (payload) => {
    const res = await axios.post(`${apiUrl}/offers/${slug}/verify-payment`, payload);
    setSuccessData(res.data.data);
    toast.success("Registration successful");
  };

  const handlePayment = async () => {
    if (!offer || !selectedBatch) {
      toast.error("Offer or Batch Data is Missing");
      return;
    }

    try {
      setPaying(true);
      const orderRes = await axios.post(`${apiUrl}/offers/${slug}/create-order`, {
        batchId: selectedBatchId,
        sourceCourseTitle,
        applicant: {
          ...form,
          name: form.name.trim(),
          email: form.email.trim(),
          phone_no: form.phone_no.trim(),
          college: form.college.trim(),
          currentAcademicProgram: form.currentAcademicProgram.trim(),
        },
      });
      const orderData = orderRes.data.data;
      if (orderData.paymentMode === "mock") {
        await handleVerify({
          registrationId: orderData.registrationId,
          razorpay_order_id: orderData.order.id,
          razorpay_payment_id: `mock_pay_${Date.now()}`,
          razorpay_signature: "mock_signature",
        });
        return;
      }
      const isLoaded = await loadRazorpay();
      if (!isLoaded || !window.Razorpay) {
        toast.error("Razorpay checkout loading Failed");
        return;
      }

      const razorpay = new window.Razorpay({
        key: orderData.razorpayKeyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: offer.heroTitle,
        description: selectedBatch.title,
        order_id: orderData.order.id,
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: form.phone_no.trim(),
        },
        theme: {
          color: "#FAAD14",
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
        handler: async (response) => {
          try {
            await handleVerify({
              registrationId: orderData.registrationId,
              ...response,
            });
          } catch (error) {
            console.error(error);
            toast.error(
              error?.response?.data?.message || "Payment verify nahi hua"
            );
          } finally {
            setPaying(false);
          }
        },
      });
      try {
  razorpay.open();
} catch (e) {
  console.error("Razorpay open failed", e);
}
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Payment start Failed");
    } finally {
      if (!window.Razorpay) {
        setPaying(false);
      }
    }
  };

  if (loading) {
    return <div className="px-6 py-32 text-center text-sm text-gray-600">Loading checkout...</div>;
  }

  if (!offer) {
    return (
      <div className="px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Offer unavailable</h1>
        <p className="mt-3 text-sm text-gray-600">
          Preview registration is not available currently.
        </p>
      </div>
    );
  }

  if (successData) {
    return (
      <div className="bg-[#faf8f5] px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-[32px] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FAAD14] text-3xl font-bold text-black">
            ✓
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            {offer.confirmationTitle}
          </h1>
          <p className="mt-4 text-sm leading-7 text-gray-600">
            {offer.confirmationMessage}
          </p>

          <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
            <div className="rounded-3xl bg-[#faf8f5] p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Registration Code
              </div>
              <div className="mt-2 text-xl font-bold text-gray-900">
                {successData.registrationCode}
              </div>
            </div>
            <div className="rounded-3xl bg-[#faf8f5] p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Selected Batch
              </div>
              <div className="mt-2 text-lg font-bold text-gray-900">
                {successData.batchTitleSnapshot}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {formatDateTime(successData.batchStartAt)}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${offer.contactWhatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-[#FAAD14] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#FAAD14]"
            >
              WhatsApp Support
            </a>
            <button
              onClick={() => navigate(`/offers/${offer.slug}`)}
              className="rounded-2xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              Back to Offer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f5] pb-20 pt-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Registration & Enrollment
          </div>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">{offer.heroTitle}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
            Complete your registration in three simple steps — share your details, select your preferred batch, and secure your seat through payment.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-4">
            {stepTitles.map((title, index) => {
              const currentStep = index + 1;
              const isActive = step === currentStep;
              const isComplete = step > currentStep;

              return (
                <div
                  key={title}
                  className={`rounded-3xl p-5 shadow-sm ring-1 ${
                    isActive
                      ? "bg-black text-white ring-black"
                      : "bg-white text-gray-900 ring-black/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold ${
                        isActive
                          ? "bg-[#FAAD14] text-black"
                          : isComplete
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isComplete ? "✓" : currentStep}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] opacity-70">
                        Step {currentStep}
                      </div>
                      <div className="mt-1 text-base font-bold">{title}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Offer Summary
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900">₹{offer.price}</div>
              {offer.supportText ? (
                <p className="mt-4 text-sm leading-6 text-gray-600">{offer.supportText}</p>
              ) : null}
            </div>
          </aside>

          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-black/5">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Step 1
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">Tell us about yourself</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Please provide your basic details to proceed with your registration. This information helps us ensure a smooth onboarding experience.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                    placeholder="Enter your full name "
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                  <input
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                  <input
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                    placeholder="Enter your phone number"
                    value={form.phone_no}
                    onChange={(e) => updateField("phone_no", e.target.value)}
                  />
                  <select
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                    value={form.currentAcademicProgram}
                    onChange={(e) =>
                      updateField("currentAcademicProgram", e.target.value)
                    }
                  >
                    <option value="">Select Academic Program</option>
                    {academicPrograms.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  placeholder="Enter your college / university"
                  value={form.college}
                  onChange={(e) => updateField("college", e.target.value)}
                />

                <div className="flex justify-end">
                  <button
                    onClick={goToNextStep}
                    className="rounded-2xl bg-[#FAAD14] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
                  >
                    Continue to Batch Selection
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Step 2
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">Select Your Batch</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Choose a batch that aligns with your schedule and availability. Seats are limited and allocated on a first-come, first-served basis.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {availableBatches.map((batch) => {
                    const isSelected = batch._id === selectedBatchId;

                    return (
                      <button
                        key={batch._id}
                        type="button"
                        onClick={() => setSelectedBatchId(batch._id)}
                        className={`rounded-3xl border p-5 text-left transition ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-[#faf8f5] text-gray-900 hover:border-black"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-lg font-bold">{batch.title}</div>
                            <div
                              className={`mt-2 text-sm ${
                                isSelected ? "text-white/70" : "text-gray-600"
                              }`}
                            >
                              {formatDateTime(batch.startAt)}
                            </div>
                          </div>
                          <div
                            className={`rounded-2xl px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] ${
                              isSelected
                                ? "bg-[#FAAD14] text-black"
                                : "bg-white text-gray-500"
                            }`}
                          >
                            {batch.availableSeats} seats left
                          </div>
                        </div>
                        <div
                          className={`mt-4 text-xs uppercase tracking-[0.2em] ${
                            isSelected ? "text-white/60" : "text-gray-500"
                          }`}
                        >
                          {batch.mode} {batch.venue ? `| ${batch.venue}` : ""}
                        </div>
                        {batch.description ? (
                          <p
                            className={`mt-4 text-sm leading-6 ${
                              isSelected ? "text-white/80" : "text-gray-600"
                            }`}
                          >
                            {batch.description}
                          </p>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap justify-between gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-2xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition hover:border-black"
                  >
                    Back
                  </button>
                  <button
                    onClick={goToNextStep}
                    className="rounded-2xl bg-[#FAAD14] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
                  >
                    Continue to Review & Payment
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Step 3
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">Review & Confirm Your Registration</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Please review your details and selected batch carefully before proceeding with the payment. Your seat will be confirmed upon successful payment.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl bg-[#faf8f5] p-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      Applicant Details
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-gray-700">
                      <div><span className="font-semibold text-gray-900">Name:</span> {form.name}</div>
                      <div><span className="font-semibold text-gray-900">Email:</span> {form.email}</div>
                      <div><span className="font-semibold text-gray-900">Phone:</span> {form.phone_no}</div>
                      <div><span className="font-semibold text-gray-900">College:</span> {form.college}</div>
                      <div>
                        <span className="font-semibold text-gray-900">Program:</span>{" "}
                        {form.currentAcademicProgram}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-[#111111] p-5 text-white">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                      Selected Batch
                    </div>
                    <div className="mt-3 text-2xl font-bold">{selectedBatch?.title}</div>
                    <div className="mt-2 text-sm text-white/70">
                      {selectedBatch ? formatDateTime(selectedBatch.startAt) : ""}
                    </div>
                    <div className="mt-5 text-xs uppercase tracking-[0.2em] text-white/50">
                      Total Payable Amount
                    </div>
                    <div className="mt-2 text-4xl font-bold text-[#FAAD14]">₹{offer.price}</div>
                    {sourceCourseTitle ? (
                      <div className="mt-5 text-xs text-white/60">
                        Triggered from: {sourceCourseTitle}
                      </div>
                    ) : null}
                  </div>
                </div>

                {offer.terms?.length > 0 && (
                  <div className="rounded-3xl border border-gray-100 p-5">
                    <div className="text-sm font-semibold text-gray-900">
                      Important Information
                    </div>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                      {offer.terms.map((item, index) => (
                        <li key={`${item}-${index}`} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#FAAD14]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap justify-between gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-2xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition hover:border-black"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={paying}
                    className="rounded-2xl bg-[#FAAD14] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {paying ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
