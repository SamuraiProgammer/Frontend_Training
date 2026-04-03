import AIClient from "./AIClient";
import ProgramsSection from "./ProgramSection";
import PromotionalBanner from "./PromotionalBanner";

export default function HeroSection() {
  return (
    <section className="mt-16">
      <div className="relative w-full py-8 px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-linear-to-r from-[#FFFFFF] to-[#F4EDFF]">

        {/* Main Heading */}
        <h1
          className="font-nunito font-extrabold text-[#614298] 
        text-[2rem] max-sm:text-[1.3rem]
        leading-tight max-w-5xl"
        >
          Transforming Psychology Education and Mental Healthcare
        </h1>

        {/* Subheading */}
        <h3
          className="mt-2 font-semibold text-[#FFD52D] 
        text-[1rem] sm:text-[1.8rem] md:text-[2.2rem] tracking-wide"
        >
          Innovate. Impart. Empower.
        </h3>
      </div>

      <PromotionalBanner />

      <ProgramsSection />

      <AIClient />
    </section>
  );
}
