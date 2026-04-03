import BecomingLogoWhite from "../assets/BecomingWhite.png";
import { openWhatsApp } from "../utils/OpenWhatsApp";
import WhatsappTalk from "./WhatsappTalk";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pb-5">
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <img
            src={BecomingLogoWhite}
            alt="Becoming Logo"
            className="h-40 w-auto object-contain"
          />
        </div>

        {/* RIGHT: WhatsApp CTA */}
        <div className="flex items-center">
          <div
            onClick={() =>
              openWhatsApp({ phoneNumber: "918448154111", message: "Hi" })
            }
            className="flex items-center gap-3 px-5 py-2.5 rounded-lg 
            bg-[#faad14] text-[#000000]
            hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 
            transition-all duration-300 cursor-pointer"
          >
            <span className="text-sm font-semibold">Chat with us</span>
          </div>
        </div>
        <WhatsappTalk
          phoneNumber="918448154111"
          message="Hi"
          tooltip="Chat on WhatsApp"
          useBy="Footer"
        />
      </div>
    </footer>
  );
}
