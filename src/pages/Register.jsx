import axios from "axios";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFeaturedOffer } from "../utils/featuredOffer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COUNTRY_CODES = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1",  country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+60", country: "MY", flag: "🇲🇾" },
  { code: "+1",  country: "CA", flag: "🇨🇦" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+92", country: "PK", flag: "🇵🇰" },
  { code: "+880", country: "BD", flag: "🇧🇩" },
  { code: "+94", country: "LK", flag: "🇱🇰" },
  { code: "+977", country: "NP", flag: "🇳🇵" },
];

const COLLEGES = [
  "Amity University, Noida",
  "Amity University, Mumbai",
  "Bangalore University",
  "Banaras Hindu University (BHU)",
  "Christ University, Bangalore",
  "Delhi University (DU)",
  "Fergusson College, Pune",
  "Guru Gobind Singh Indraprastha University",
  "Hyderabad University",
  "Indian Institute of Psychology and Research (IIPR)",
  "Isabella Thoburn College, Lucknow",
  "Jamia Millia Islamia, Delhi",
  "Jawaharlal Nehru University (JNU)",
  "Kirori Mal College, Delhi",
  "Lady Shri Ram College, Delhi",
  "Loyola College, Chennai",
  "Manipal Academy of Higher Education",
  "Miranda House, Delhi",
  "Mount Carmel College, Bangalore",
  "Nirmala Niketan College, Mumbai",
  "NMIMS University, Mumbai",
  "Osmania University, Hyderabad",
  "Panjab University, Chandigarh",
  "Presidency College, Chennai",
  "Pune University",
  "SNDT Women's University, Mumbai",
  "Sophia College, Mumbai",
  "Sri Venkateswara College, Delhi",
  "St. Xavier's College, Mumbai",
  "St. Xavier's College, Kolkata",
  "Symbiosis School of Liberal Arts, Pune",
  "Tata Institute of Social Sciences (TISS)",
  "University of Calcutta",
  "University of Delhi",
  "University of Mumbai",
  "Vivekananda College, Delhi",
  "Xavier's Institute of Communications, Mumbai",
  "Jai Hind College, Mumbai",
  "HR College, Mumbai",
  "KJ Somaiya College, Mumbai",
  "Mithibai College, Mumbai",
  "Ramnarain Ruia College, Mumbai",
  "Narsee Monjee College, Mumbai",
  "Wilson College, Mumbai",
  "Institute of Home Economics, Delhi",
  "Gargi College, Delhi",
  "Hansraj College, Delhi",
  "Hindu College, Delhi",
  "Jesus and Mary College, Delhi",
  "Maitreyi College, Delhi",
  "Ramjas College, Delhi",
  "Shaheed Bhagat Singh College, Delhi",
  "Sri Aurobindo College, Delhi",
  "Daulat Ram College, Delhi",
  "Indraprastha College, Delhi",
  "Kamala Nehru College, Delhi",
  "Mata Sundri College, Delhi",
  "PGDAV College, Delhi",
  "Rajdhani College, Delhi",
  "Shyam Lal College, Delhi",
  "Zakir Husain College, Delhi",
  "Ambedkar University Delhi",
  "IP University, Delhi",
  "Manipur University",
  "Gauhati University",
  "Cotton University, Assam",
  "Dibrugarh University",
  "Rajasthan University, Jaipur",
  "Jai Narain Vyas University, Jodhpur",
  "Mohanlal Sukhadia University, Udaipur",
  "Malaviya National Institute of Technology",
  "BITS Pilani (Psychology minor)",
  "Mysore University",
  "Mangalore University",
  "Gulbarga University",
  "Dharwad University",
  "Kuvempu University",
  "Calicut University",
  "Mahatma Gandhi University, Kerala",
  "Kerala University",
  "Cochin University",
  "Pondicherry University",
  "Annamalai University",
  "Madras University",
  "Bharathidasan University",
  "Mother Teresa Women's University",
  "Alagappa University",
  "Andhra University",
  "Sri Krishnadevaraya University",
  "Vikram University, Ujjain",
  "Dr. Hari Singh Gour University, Sagar",
  "Barkatullah University, Bhopal",
  "Devi Ahilya Vishwavidyalaya, Indore",
  "Nagpur University",
  "Shivaji University, Kolhapur",
  "North Maharashtra University",
  "Solapur University",
  "Swami Ramanand Teerth Marathwada University",
  "Dr. Babasaheb Ambedkar Marathwada University",
  "Other",
];

// const COURSES = [
//   // Undergraduate
//   "Mentorship and Training – Clinical & Counselling Psychology",
//   "Mentorship and Training – Organizational Psychology",
//   "Supervision and Practical – Professional Mentorship and Supervision Programme",
//   // Postgraduate
//   "Advanced Clinical Practice – Clinical & Counselling Psychology",
//   "Research and Applied Psychology – Organizational & Industrial Psychology",
//   "Supervised Clinical Internship – Neuropsychology & Rehabilitation",
//   "Mentorship and Training – Child & Adolescent Psychology",
//   "Supervision and Practical – Professional Supervision Programme (PG)",
//   // Early Career
//   "Professional Mentorship – Clinical & Counselling Psychology",
//   "Practice Building Workshop – Private Practice & Entrepreneurship",
//   "Supervised Case Consultation – Organizational Psychology",
//   "Mentorship and Training – Child & Adolescent Therapy",
//   "Supervision and Practical – Professional Supervision Programme (EC)",
// ];

const COURSES = [
    "Undergraduate",
    "Postgraduate"
]

// ─── Autocomplete Field ───────────────────────────────────────────────────────

function AutocompleteField({ label, placeholder, options, value, onChange, onSelect, error, icon }) {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (value.trim().length > 0) {
      const q = value.toLowerCase();
      setFiltered(options.filter((o) => o.toLowerCase().includes(q)).slice(0, 8));
      setOpen(true);
    } else {
      setFiltered([]);
      setOpen(false);
    }
  }, [value, options]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <span style={iconWrapStyle}>{icon}</span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.trim() && setOpen(true)}
          style={{
            ...inputStyle,
            paddingLeft: "44px",
            borderColor: error ? "#e05252" : value ? "#5b4fcf" : "#ede9f8",
            boxShadow: error
              ? "0 0 0 3px rgba(224,82,82,0.12)"
              : value
              ? "0 0 0 3px rgba(91,79,207,0.1)"
              : "none",
          }}
          autoComplete="off"
        />
      </div>
      {error && <p style={errorStyle}>{error}</p>}
      {open && filtered.length > 0 && (
        <ul style={dropdownStyle}>
          {filtered.map((item, i) => (
            <li
              key={i}
              onMouseDown={() => { onSelect(item); setOpen(false); }}
              style={dropdownItemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0ebff";
                e.currentTarget.style.color = "#5b4fcf";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1a1a2e";
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Style tokens ─────────────────────────────────────────────────────────────

const labelStyle = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#1a1a2e",
  marginBottom: "7px",
  letterSpacing: "0.2px",
};

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "12px",
  border: "1.5px solid #ede9f8",
  background: "#fff",
  fontSize: "0.9rem",
  color: "#1a1a2e",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const errorStyle = {
  fontSize: "0.75rem",
  color: "#e05252",
  marginTop: "5px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

const iconWrapStyle = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "1rem",
  pointerEvents: "none",
  zIndex: 1,
};

const dropdownStyle = {
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  right: 0,
  background: "#fff",
  border: "1.5px solid #ede9f8",
  borderRadius: "14px",
  boxShadow: "0 8px 28px rgba(91,79,207,0.13)",
  zIndex: 999,
  listStyle: "none",
  padding: "6px",
  margin: 0,
  maxHeight: "220px",
  overflowY: "auto",
};

const dropdownItemStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  color: "#1a1a2e",
  cursor: "pointer",
  transition: "background 0.15s, color 0.15s",
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RegisterPage({heading="2 Hour Preview of the Training @ Just ₹500"}) {
  const whatsappNumber = "918448154111"
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const resolvedHeading = location.state?.heading || heading;
  const [checkingOffer, setCheckingOffer] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: COUNTRY_CODES[0],
    phone: "",
    college: "",
    course: ""
  });

  const [errors, setErrors] = useState({});
  const [codeOpen, setCodeOpen] = useState(false);
  const [codeSearch, setCodeSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const codeRef = useRef(null);
  const whatsappMessage = `Hi, I have registered for your program: ${resolvedHeading}.

Full Name: ${form.name}
Email: ${form.email}
Phone: ${form.countryCode.code}${form.phone}
College: ${form.college}
Current Academic Program: ${form.course}`;

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Close country code dropdown on outside click
  useEffect(() => {
    const h = (e) => {
      if (codeRef.current && !codeRef.current.contains(e.target)) setCodeOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const shouldUseLegacyFlow = Boolean(location.state?.forceLegacy);

    if (shouldUseLegacyFlow) {
      setCheckingOffer(false);
      return;
    }

    const redirectToFeaturedOffer = async () => {
      try {
        const offer = await fetchFeaturedOffer();

        if (offer?.slug) {
          navigate(`/offers/${offer.slug}/register`, { replace: true });
          return;
        }
      } catch (error) {
        console.error("Featured offer redirect skipped", error);
      }

      setCheckingOffer(false);
    };

    redirectToFeaturedOffer();
  }, [location.state, navigate]);

  const filteredCodes = COUNTRY_CODES.filter(
    (c) =>
      c.country.toLowerCase().includes(codeSearch.toLowerCase()) ||
      c.code.includes(codeSearch)
  );

  // ── Validation ──
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    else if (form.name.trim().length < 2) e.name = "Enter a valid name.";

    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";

    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone))
      e.phone = "Phone must be exactly 10 digits.";

    if (!form.college.trim()) e.college = "College name is required.";
    if (!form.course.trim()) e.course = "Please select a course.";

    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);

    if (Object.keys(e).length > 0 || isSubmitting) return;

    if (!apiUrl) {
      toast.error("API URL is not configured.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone_no: `${form.countryCode.code}${form.phone}`,
        college: form.college.trim(),
        course: form.course.trim(),
        registeredForProgram: resolvedHeading
      };

      const response = await axios.post(`${apiUrl}/auth/register`, payload);

      if (response.status === 201) {
        setSubmitted(true);
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const set = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (checkingOffer) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf8f5",
        }}
      >
        <p style={{ color: "#666", fontSize: "0.95rem" }}>Preparing registration flow...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Nunito', sans-serif",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "56px 40px",
            textAlign: "center",
            maxWidth: "460px",
            width: "100%",
            border: "1.5px solid #ede9f8",
            boxShadow: "0 16px 32px rgba(91,79,207,0.12)",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#faad14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "2rem",
            }}
          >
            ✓
          </div>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: "12px",
            }}
          >
            Registration Successful!
          </h2>
          <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "32px" }}>
            Thank you, <strong style={{ color: "#faad14" }}>{form.name}</strong>! Your registration
            has been received. We'll reach out to you at{" "}
            <strong style={{ color: "#faad14" }}>{form.email}</strong> with next steps.
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#faad14",
              color: "#000",
              border: "none",
              borderRadius: "50px",
              padding: "13px 36px",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              letterSpacing: "0.3px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#faad14")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#faad14")}
          >
            ← Back to Courses
          </button>
          <p
            style={{
              marginTop: "24px",
              marginBottom: "12px",
              color: "#666",
              fontSize: "0.9rem",
              fontWeight: 700,
            }}
          >
            Have some queries?
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              background: "#25D366",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "50px",
              padding: "13px 36px",
              fontWeight: 700,
              fontSize: "0.88rem",
              letterSpacing: "0.3px",
              transition: "all 0.2s ease",
            }}
          >
            Reach out to us
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #faf8f5; }
        input::placeholder { color: #bbb; }
        input:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d0c8f0; border-radius: 4px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .form-card {
          animation: fadeUp 0.5s ease both;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, #f0ebff 0%, #faf8f5 50%, #e8f0ff 100%)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "clamp(24px, 5vw, 56px) 16px",
        }}
      >
        <div
          className="form-card"
          style={{
            background: "#fff",
            borderRadius: "28px",
            border: "1.5px solid #ede9f8",
            boxShadow: "0 8px 40px rgba(91,79,207,0.1)",
            padding: "clamp(28px, 5vw, 52px)",
            width: "100%",
            maxWidth: "560px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#1a1a2e",
                color: "#fff",
                fontFamily: "'Nunito', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.8px",
                padding: "6px 16px",
                borderRadius: "50px",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              {resolvedHeading}
            </div>
            <h1
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 700,
                color: "#1a1a2e",
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                marginBottom: "8px",
              }}
            >
              Register for a Programme
            </h1>
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.87rem", color: "#888", lineHeight: 1.6 }}>
              Fill in your details and we'll get back to you shortly.
            </p>
          </div>

          {/* ── Form Fields ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* Name */}
            <div>
              <label style={labelStyle}>Full Name</label>
              <div style={{ position: "relative" }}>
                <span style={iconWrapStyle}>👤</span>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  style={{
                    ...inputStyle,
                    paddingLeft: "44px",
                    borderColor: errors.name ? "#e05252" : form.name ? "#5b4fcf" : "#ede9f8",
                    boxShadow: errors.name
                      ? "0 0 0 3px rgba(224,82,82,0.12)"
                      : form.name
                      ? "0 0 0 3px rgba(91,79,207,0.1)"
                      : "none",
                  }}
                />
              </div>
              {errors.name && <p style={errorStyle}>⚠ {errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: "relative" }}>
                <span style={iconWrapStyle}>✉️</span>
                <input
                  type="email"
                  placeholder="e.g. priya@email.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  style={{
                    ...inputStyle,
                    paddingLeft: "44px",
                    borderColor: errors.email ? "#e05252" : form.email ? "#5b4fcf" : "#ede9f8",
                    boxShadow: errors.email
                      ? "0 0 0 3px rgba(224,82,82,0.12)"
                      : form.email
                      ? "0 0 0 3px rgba(91,79,207,0.1)"
                      : "none",
                  }}
                />
              </div>
              {errors.email && <p style={errorStyle}>⚠ {errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number</label>
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>

                {/* Country code picker */}
                <div ref={codeRef} style={{ position: "relative", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => { setCodeOpen((o) => !o); setCodeSearch(""); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "13px 12px",
                      borderRadius: "12px",
                      border: `1.5px solid ${codeOpen ? "#5b4fcf" : "#ede9f8"}`,
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: "0.88rem",
                      color: "#1a1a2e",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      boxShadow: codeOpen ? "0 0 0 3px rgba(91,79,207,0.1)" : "none",
                      transition: "all 0.2s",
                      minWidth: "90px",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{form.countryCode.flag}</span>
                    <span>{form.countryCode.code}</span>
                    <span style={{ fontSize: "0.65rem", color: "#aaa", marginLeft: "2px" }}>▼</span>
                  </button>

                  {codeOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        background: "#fff",
                        border: "1.5px solid #ede9f8",
                        borderRadius: "14px",
                        boxShadow: "0 8px 28px rgba(91,79,207,0.13)",
                        zIndex: 9999,
                        width: "200px",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ padding: "8px" }}>
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search..."
                          value={codeSearch}
                          onChange={(e) => setCodeSearch(e.target.value)}
                          style={{
                            ...inputStyle,
                            padding: "8px 12px",
                            fontSize: "0.8rem",
                            borderColor: "#ede9f8",
                          }}
                        />
                      </div>
                      <ul
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          listStyle: "none",
                          padding: "4px 6px 8px",
                        }}
                      >
                        {filteredCodes.map((c, i) => (
                          <li
                            key={i}
                            onMouseDown={() => { set("countryCode", c); setCodeOpen(false); }}
                            style={{
                              ...dropdownItemStyle,
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0ebff")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <span style={{ fontSize: "1rem" }}>{c.flag}</span>
                            <span style={{ fontWeight: 600, color: "#5b4fcf", minWidth: "38px" }}>{c.code}</span>
                            <span style={{ color: "#666", fontSize: "0.78rem" }}>{c.country}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Phone input */}
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={form.phone}
                    maxLength={10}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      set("phone", val);
                    }}
                    style={{
                      ...inputStyle,
                      borderColor: errors.phone
                        ? "#e05252"
                        : form.phone.length === 10
                        ? "#5b4fcf"
                        : "#ede9f8",
                      boxShadow: errors.phone
                        ? "0 0 0 3px rgba(224,82,82,0.12)"
                        : form.phone.length === 10
                        ? "0 0 0 3px rgba(91,79,207,0.1)"
                        : "none",
                    }}
                  />
                  {/* Digit counter */}
                  {form.phone.length > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: form.phone.length === 10 ? "#5b4fcf" : "#bbb",
                      }}
                    >
                      {form.phone.length}/10
                    </span>
                  )}
                </div>
              </div>
              {errors.phone && <p style={errorStyle}>⚠ {errors.phone}</p>}
            </div>

            {/* College */}
            <AutocompleteField
              label="College / University Name"
              placeholder="Start typing your college name..."
              options={COLLEGES}
              value={form.college}
              onChange={(v) => set("college", v)}
              onSelect={(v) => set("college", v)}
              error={errors.college}
              icon="🎓"
            />

            {/* Course */}
            <AutocompleteField
              label="Current Academic Pogram"
              placeholder="Search for a course..."
              options={COURSES}
              value={form.course}
              onChange={(v) => set("course", v)}
              onSelect={(v) => set("course", v)}
              error={errors.course}
              icon="📚"
            />

            {/* Divider */}
            <div style={{ borderTop: "1px solid #ede9f8", margin: "4px 0" }} />

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "50px",
                border: "none",
                background: isSubmitting ? "#ffe08a" : "#faad14",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.3px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 16px rgba(91,79,207,0.3)",
                opacity: isSubmitting ? 0.85 : 1,
              }}
              onMouseEnter={(e) => {
                if (isSubmitting) return;
                e.currentTarget.style.background = "#f39c12";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(91,79,207,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isSubmitting ? "#ffe08a" : "#faad14";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(91,79,207,0.3)";
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration →"}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "0.78rem",
                color: "#aaa",
                lineHeight: 1.6,
              }}
            >
              By registering, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
