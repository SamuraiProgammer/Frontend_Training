import { useRef, useState, useEffect } from "react";
import demoVideo from "../assets/video.mp4";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { TbMaximize } from "react-icons/tb";
import { FaVolumeOff } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";


const CustomVideoPlayer = () => {
  const videoRef = useRef(null);
  const controlsTimeout = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  /* PLAY / PAUSE */
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.paused ? video.play() : video.pause();
  };

  /* TIME UPDATE */
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100 || 0);
  };



  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  /* AUTO HIDE CONTROLS */
  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);

    controlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.onplay = () => setIsPlaying(true);
    video.onpause = () => setIsPlaying(false);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={demoVideo}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        className="w-full cursor-pointer"
      />

      {/* CENTER PLAY BUTTON */}
      {!isPlaying && (
        <button
          onClick={(e)=>{e.stopPropagation(); togglePlay();}}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-white text-2xl">
            <FaPlay />
          </div>
        </button>
      )}

      {/* CONTROLS */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white transition-opacity duration-300 ease-in-out ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

          {/* CONTROLS ROW */}
          <div>
            <div className="flex items-center justify-between gap-3">
              <button onClick={toggleMute}>
                {isMuted ? <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black/60 text-white text-2xl"><FaVolumeXmark className="text-lg" /></div> : <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black/60 text-white text-2xl"><FaVolumeOff className="text-lg" /></div>}
              </button>

              <button
                onClick={() => videoRef.current.requestFullscreen()}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black/60 text-white text-2xl"><TbMaximize className="text-lg" /></div>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CustomVideoPlayer;
