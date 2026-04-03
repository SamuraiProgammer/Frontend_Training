import TeamCard from "../components/TeamCard";
import sumeet from "../assets/team/sumeet.png";
import Astha from "../assets/team/astha.jpg";
import Pramod from "../assets/team/pramod.png";
import Kaif from "../assets/team/KaifAli.jpg";
import Sushmita from "../assets/team/sushmita.jpg";
import Santosh from "../assets/team/santosh.jpg";
import Anwesha from "../assets/team/anwesha.jpg";
import Naveen from "../assets/team/naveen.jpg";
import Ria from "../assets/team/ria.jpg";
import Avardhan from "../assets/team/avardhan.jpg";
import Natasha from "../assets/team/natasha.jpg";
import { team } from "../constants/clientsData";


export default function OurTeam() {
  return (
    <div className="relative overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-[#fffec4] -z-10"></div>

  {/* Glow Effects (lighter & softer) */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/30 blur-[120px] rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-300/30 blur-[120px] rounded-full"></div>

  <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-20">
    
    {/* Header */}
    <div className="text-center mb-16">
      
      {/* Badge */}
      <span className="inline-block px-4 py-1 text-xs font-semibold tracking-widest uppercase 
      text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-full mb-4">
        Our Team
      </span>

      {/* Title */}
      <h2 className="text-[32px] sm:text-[42px] md:text-[48px] font-extrabold text-gray-900 leading-tight">
        Meet The Clinical Team
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
        The people behind our vision — building, innovating, and delivering excellence every day.
      </p>

      {/* Divider */}
      <div className="w-20 h-[3px] bg-gradient-to-r from-yellow-500 to-orange-400 mx-auto mt-6 rounded-full"></div>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10">
      {team.map((member, i) => (
        <TeamCard key={i} {...member} />
      ))}
    </div>
  </section>
</div>
  );
}