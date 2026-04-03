import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
import BatchCard from "./BatchCard";
import { useRecoilValue } from "recoil";
import { dapatom } from "../recoil/DAP";

const BatchModal = ({ isOpen, onClose, courseDetails }) => {
  const hen=useRecoilValue(dapatom);
  console.log(hen,"dta from recoil in batch modal",courseDetails);
  const [courseDetail,setCourseDetail] = useState({})
  const [activeTab, setActiveTab] = useState("online");
  useEffect(() => {
    setCourseDetail(courseDetails);
  }, [courseDetails]);

  const handleCloseModal = () => {
    onClose();
  };

  const filteredBatches = courseDetail?.batches?.filter((batch) => {
    const mode = (batch?.mode || "").toLowerCase().trim(); // safe normalization
    const tab = (activeTab || "").toLowerCase().trim();
    return mode === tab;
  });

  useEffect(() => {
    // In case any external prop changes it to different casing
    setActiveTab((prev) => (prev ? prev.toLowerCase() : "online"));
  }, [activeTab]);

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-bl bg-opacity-50">
      <div className="bg-b-1 p-[40px] rounded-[26px] shadow-lg relative w-[50%] h-[700px]  overflow-y-auto scrollbar-hide">
        <button
          className="absolute top-6 right-8 text-bl font-bold"
          onClick={handleCloseModal}
        >
          <X size={24} />
        </button>
        <div className="flex justify-center mb-4">
          <p className="text-[2rem] sm:text-[4rem] font-nunito font-bold text-p-5">
            Select Batch
          </p>
        </div>
        <div className="flex justify-center mb-6">
          <button
            className={`px-10 py-2 mx-2 font-nunito font-normal sm:text-[1.8rem] text-[1rem] rounded-xl ${activeTab === "online" ? "bg-b-2 text-p-5" : "text-g-6"
              }`}
            onClick={() => setActiveTab("online")}
          >
            Online
          </button>
          <div className="border-l h-6 my-auto border-g-6"></div> {/* Vertical Line */}
          <button
            className={`px-10 py-2 mx-2 font-nunito font-normal sm:text-[1.8rem] text-[1rem] rounded-xl ${activeTab === "offline" ? "bg-b-2 text-p-5" : "text-g-6"
              }`}
            onClick={() => setActiveTab("offline")}
          >
            Offline
          </button>
          <div className="border-l h-6 my-auto border-g-6"></div> {/* Vertical Line */}
          <button
            className={`px-10 py-2 mx-2 font-nunito font-normal sm:text-[1.8rem] text-[1rem] rounded-xl ${activeTab === "hybrid" ? "bg-b-2 text-p-5" : "text-g-6"
              }`}
            onClick={() => setActiveTab("hybrid")}
          >
            Hybrid
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {filteredBatches?.length > 0 ? (
            filteredBatches?.map((batch, index) => (
              <BatchCard key={index} batch={batch} courseDetails={courseDetails}/>
            ))
          ) : (
            <p className="text-center text-p-5">
              No batches available for {activeTab}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchModal;
