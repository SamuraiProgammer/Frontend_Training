import {useNavigate} from 'react-router-dom'

const ProgramCard = ({
  badge,
  badgeColor,
  title,
  features = [],
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="group relative rounded-2xl p-[1px]
      transition-all duration-500"
    >
      <div
        className="bg-white rounded-2xl p-6 md:p-8 h-full 
        flex flex-col justify-between 
        shadow-md group-hover:shadow-xl 
        transition-all duration-500 hover:-translate-y-1"
      >
        {/* Badge */}
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${badgeColor}`}
        >
          {badge}
        </span>

        {/* Title */}
        <h2 className="mt-4 text-xl md:text-2xl font-bold text-gray-900 leading-snug">
          {title}
        </h2>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-4">
          {features.map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-600"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          className="mt-6 w-fit px-6 py-2.5 rounded-lg font-semibold text-[#000000] 
          bg-[#faad14]
          hover:scale-105 hover:shadow-md 
          transition-all duration-300 cursor-pointer"
          onClick={()=> navigate("/explore")}
        >
          Explore
        </button>
      </div>
    </div>
  );
};


export default function ProgramsSection() {
  return (
    <div className="w-full py-8 px-6">
      
      <div className="max-w-7xl mx-auto">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <ProgramCard
            badge="60 to 240 Hours"
            badgeColor="text-purple-600 bg-purple-50"
            title="Training Based Internship Programme"
            features={["1–2 Months", "Certification", "Mentorship"]}
          />

          <ProgramCard
            badge="Personal Growth"
            badgeColor="text-cyan-600 bg-cyan-50"
            title="1 to 1 Mentorship Supervision Programme"
            features={["1–6 Months", "Certification"]}
          />

        </div>
      </div>
    </div>
  );
}