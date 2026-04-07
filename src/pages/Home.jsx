import { useState, useEffect } from "react";
import About from "../pages/About";
import Project from "./Project";
import Contact from "./Contact";

export default function Home() {
  const [videoSrc, setVideoSrc] = useState("/castlecloud.mp4");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVideoSrc("/yuanvslin.mp4"); // Desktop
      } else if (window.innerWidth >= 768) {
        setVideoSrc("/phrolova.mp4"); // Tablet
      } else {
        setVideoSrc("/wlop.mp4"); // Mobile
      }
    };

    handleResize(); // Set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-black text-white font-sans selection:bg-zinc-800">
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Modern Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            key={videoSrc} // Key forces video to reload when source changes
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 transition-opacity duration-1000 opacity-70"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-75 z-1" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-4">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-zinc-400 font-medium animate-fade-in">
            Software Developer
          </p>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-none">
            SEA <span className="font-bold">SENGLY</span>
          </h1>
          <div className="flex justify-center pt-8">
            <div className="h-[1px] w-12 bg-white/50" />
          </div>
        </div>

        {/* Bottom Fade & Scroll Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-20">
          <span className="text-[8px] uppercase tracking-widest font-bold animate-pulse">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </section>

      <About />
      <Project />
      <Contact />
    </div>
  );
}
