import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { purchaseDetails } from "../store/slices/purchaseCourseSlices";
//import LoginModal from "./LoginModal";

const BatchCard = ({ batch, courseDetails }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userDetails.currentUser);
  const navigate = useNavigate();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const proceedForPurchase = () => {
    const courseData = {
      courseId: courseDetails._id,
      batch: batch,
    };
    dispatch(purchaseDetails(courseData));
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    }
    navigate("/payment");
  };

  const labelStyle = {
    
    fontSize: "0.85rem",
    color: "#888",
    lineHeight: "1.8",
  };

  const valueStyle = {
    
    fontSize: "0.85rem",
    color: "#1a1a2e",
    fontWeight: 600,
    lineHeight: "1.8",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          minWidth: "min(27rem, 90vw)",
          padding: "28px 24px",
          border: "1px solid #ede9f8",
          borderRadius: "20px",
          background: "#fff",
          boxShadow: "0 2px 12px rgba(91, 79, 207, 0.07)",
          
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 8px 28px rgba(91, 79, 207, 0.14)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 2px 12px rgba(91, 79, 207, 0.07)";
        }}
      >
        {/* Batch Name */}
        <p
          style={{
            
            fontWeight: 700,
            fontSize: "1.4rem",
            color: "#1a1a2e",
            textAlign: "center",
            letterSpacing: "-0.3px",
          }}
        >
          {batch?.batchName}
        </p>

        <div
          style={{ borderBottom: "1px solid #ede9f8", width: "100%" }}
        />

        {/* Details Grid */}
        <div style={{ display: "flex", width: "100%", gap: "8px" }}>
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p style={labelStyle}>Batch type :</p>
            <p style={labelStyle}>Batch Level :</p>
            <p style={labelStyle}>Mode :</p>
            <p style={labelStyle}>Date :</p>
            <p style={labelStyle}>Time :</p>
          </div>
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p style={valueStyle}>{batch?.batchType}</p>
            <p style={valueStyle}>{batch?.batchLevel}</p>
            <p style={valueStyle}>{batch?.mode}</p>
            <p style={valueStyle}>{batch?.date}</p>
            <p style={valueStyle}>{batch?.time}</p>
          </div>
        </div>

        {/* Price Button */}
        <button
          onClick={proceedForPurchase}
          style={{
            background: "#5b4fcf",
            width: "100%",
            padding: "14px 8px",
            borderRadius: "50px",
            color: "#fff",
            
            fontWeight: 700,
            fontSize: "1rem",
            border: "2px solid #5b4fcf",
            cursor: "pointer",
            letterSpacing: "0.3px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#4338b5";
            e.currentTarget.style.borderColor = "#4338b5";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(91, 79, 207, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#5b4fcf";
            e.currentTarget.style.borderColor = "#5b4fcf";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ₹{batch?.price}/-
        </button>
      </div>

      <>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setLoginModalOpen(false)}
        />
      </>
    </>
  );
};

export default BatchCard;
