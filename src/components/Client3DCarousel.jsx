import { useRef, useState } from "react";
import { clients } from "../constants/clientsData";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const getPositionStyles = (offset) => {
  const map = {
    0: "z-30 scale-100 opacity-100 translate-x-0 rotate-y-0",
    1: "z-20 scale-90 opacity-60 translate-x-[220px] rotate-y-[-25deg]",
    2: "z-10 scale-75 opacity-30 translate-x-[420px] rotate-y-[-40deg]",
    "-1": "z-20 scale-90 opacity-60 translate-x-[-220px] rotate-y-[25deg]",
    "-2": "z-10 scale-75 opacity-30 translate-x-[-420px] rotate-y-[40deg]",
  };
  return map[offset] || "hidden";
};

const Client3DCarousel = () => {
  const [centerIndex, setCenterIndex] = useState(2);

  const getYouTubeEmbedUrl = (url, autoplay = false) => {
    const videoId = url.split("/").pop().split("?")[0];

    return `https://www.youtube.com/embed/${videoId}?autoplay=${
      autoplay ? 1 : 0
    }&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
  };

  const unmuteVideo = (iframe) => {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "unMute",
        args: [],
      }),
      "*",
    );
  };

  const moveLeft = () => {
    setCenterIndex((i) => (i === 0 ? clients.length - 1 : i - 1));
  };

  const moveRight = () => {
    setCenterIndex((i) => (i === clients.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="relative mx-auto mt-20 h-[300px] sm:h-[500px] max-w-6xl perspective-[1200px]">
      <div className="relative flex h-full items-center justify-center max-xl:hidden">
        {clients.map((client, index) => {
          let offset = index - centerIndex;
          if (offset > 2) offset -= clients.length;
          if (offset < -2) offset += clients.length;

          const isCenter = offset === 0;

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-out transform-style-preserve-3d
                ${getPositionStyles(offset)}
              `}
            >
              <div className="relative h-[570px] w-[360px] overflow-hidden rounded-3xl shadow-2xl bg-black">
                <button
                  onClick={(e) => {
                    const iframe =
                      e.currentTarget.parentElement.querySelector("iframe");
                    unmuteVideo(iframe);
                  }}
                  className="absolute top-4 right-4 z-10 bg-black/60 text-white px-3 py-1 rounded-full text-xs"
                >
                  🔊 Unmute
                </button>

                <iframe
                  key={client.id + "-" + centerIndex}
                  src={getYouTubeEmbedUrl(client.videoLink, isCenter)}
                  className="h-full w-full object-cover"
                  allow="autoplay"
                  allowFullScreen
                />

                {/* <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#391085] p-4 text-white">
                  <p className="text-lg font-semibold text-center">{client.name}</p>
                  <p className="text-xs opacity-80 text-center">{client.role}</p>
                </div> */}
              </div>

              {isCenter && (
                <>
                  <button
                    onClick={moveLeft}
                    className="absolute left-[-60px] top-1/2 -translate-y-1/2 rounded-full bg-[#faad14] text-black p-3"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    onClick={moveRight}
                    className="absolute right-[-60px] top-1/2 -translate-y-1/2 rounded-full bg-[#faad14] text-black p-3"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative flex h-full items-center justify-center xl:hidden max-sm:hidden">
        {clients.map((client, index) => {
          let offset = index - centerIndex;

          if (offset > 1) offset -= clients.length;
          if (offset < -1) offset += clients.length;

          const isCenter = offset === 0;

          const mobileStyles = {
            0: "z-30 scale-100 opacity-100 translate-x-0",
            1: "z-20 scale-90 opacity-60 translate-x-[160px]",
            "-1": "z-20 scale-90 opacity-60 translate-x-[-160px]",
          };

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-out
        ${mobileStyles[offset] || "hidden"}`}
            >
              <div className="relative h-[460px] w-[85vw] max-w-[300px] overflow-hidden rounded-3xl shadow-2xl bg-black">
                <button
                  onClick={(e) => {
                    const iframe =
                      e.currentTarget.parentElement.querySelector("iframe");
                    unmuteVideo(iframe);
                  }}
                  className="absolute top-4 right-4 z-10 bg-black/60 text-white px-3 py-1 rounded-full text-xs"
                >
                  🔊 Unmute
                </button>
                <iframe
                  key={client.id + "-" + centerIndex}
                  src={getYouTubeEmbedUrl(client.videoLink, isCenter)}
                  className="h-full w-full object-cover"
                  allow="autoplay"
                  allowFullScreen
                />

                {/* <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#391085] p-4 text-white">
                  <p className="text-lg font-semibold text-center">
                    {client.name}
                  </p>
                  <p className="text-xs opacity-80 text-center">
                    {client.role}
                  </p>
                </div> */}
              </div>

              {isCenter && (
                <>
                  <button
                    onClick={moveLeft}
                    className="absolute left-[-40px] top-1/2 -translate-y-1/2 rounded-full bg-[#faad14] text-black p-3"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    onClick={moveRight}
                    className="absolute right-[-40px] top-1/2 -translate-y-1/2 rounded-full bg-[#faad14] text-black p-3"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative flex h-full items-center justify-center sm:hidden">
        {clients.map((client, index) => {
          let offset = index - centerIndex;

          if (offset > 0) offset -= clients.length;
          if (offset < 0) offset += clients.length;

          const isCenter = offset === 0;
          if (!isCenter) return null;

          const mobileStyles = {
            0: "z-30 scale-100 opacity-100 translate-x-0",
            1: "z-20 scale-90 opacity-60 translate-x-[160px]",
            "-1": "z-20 scale-90 opacity-60 translate-x-[-160px]",
          };

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-out
        ${mobileStyles[offset] || "hidden"}`}
            >
              <div className="relative h-[300px] w-[200px] overflow-hidden rounded-3xl shadow-2xl bg-black">
                <button
                  onClick={(e) => {
                    const iframe =
                      e.currentTarget.parentElement.querySelector("iframe");
                    unmuteVideo(iframe);
                  }}
                  className="absolute top-4 right-4 z-10 bg-black/60 text-white px-3 py-1 rounded-full text-xs"
                >
                  🔊 Unmute
                </button>
                <iframe
                  key={client.id + "-" + centerIndex}
                  src={getYouTubeEmbedUrl(client.videoLink, isCenter)}
                  className="h-full w-full object-cover"
                  allow="autoplay"
                  allowFullScreen
                />

                {/* <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#391085] p-4 text-white">
                  <p className="text-lg font-semibold text-center">
                    {client.name}
                  </p>
                  <p className="text-xs opacity-80 text-center">
                    {client.role}
                  </p>
                </div> */}
              </div>

              {isCenter && (
                <>
                  <button
                    onClick={moveLeft}
                    className="absolute left-[-40px] top-1/2 -translate-y-1/2 rounded-full bg-[#faad14] text-black p-3"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    onClick={moveRight}
                    className="absolute right-[-40px] top-1/2 -translate-y-1/2 rounded-full bg-[#faad14] text-black p-3"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Client3DCarousel;
