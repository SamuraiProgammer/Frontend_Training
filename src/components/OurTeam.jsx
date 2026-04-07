import TeamCard from "../components/TeamCard";
import { team } from "../constants/clientsData";
import { useState, useEffect } from "react";

export default function OurTeam() {
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateItemsPerRow = () => {
      if (window.innerWidth < 640) {
        setItemsPerRow(3); // mobile
      } else if (window.innerWidth < 768) {
        setItemsPerRow(3); // tablet
      } else {
        setItemsPerRow(4); // desktop
      }
    };

    updateItemsPerRow();
    window.addEventListener("resize", updateItemsPerRow);

    return () => window.removeEventListener("resize", updateItemsPerRow);
  }, []);

  const visibleMembers = showAll
    ? team
    : team.slice(0, itemsPerRow);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#fffec4] -z-10"></div>

      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-widest uppercase 
          text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-full mb-4">
            Our Team
          </span>

          <h2 className="text-[32px] sm:text-[42px] md:text-[48px] font-extrabold text-gray-900 leading-tight">
            Meet The Clinical Team
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            The people behind our vision — building, innovating, and delivering excellence every day.
          </p>

          <div className="w-20 h-[3px] bg-gradient-to-r from-yellow-500 to-orange-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {visibleMembers.map((member, i) => (
            <TeamCard key={i} {...member} />
          ))}
        </div>

        {/* View More Button */}
        {!showAll && team.length > itemsPerRow && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 font-semibold bg-[#FAAD14] text-[#000000] rounded-lg hover:bg-purple-700 hover:text-[#FFFFFF] cursor-pointer transition"
            >
              View More
            </button>
          </div>
        )}
      </section>
    </div>
  );
}