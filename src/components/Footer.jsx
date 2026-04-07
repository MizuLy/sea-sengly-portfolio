import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-black text-zinc-500 flex flex-col items-center">
      {/* Subtle Fading Line */}
      <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8" />

      <div className="flex flex-col items-center gap-4 px-4 text-center">
        {/* Branding */}
        <h2 className="text-white text-xs tracking-[0.4em] font-light uppercase">
          Sea <span className="font-bold">Sengly</span>
        </h2>

        {/* Credits & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-[10px] uppercase tracking-widest font-medium">
          <p className="hover:text-zinc-300 transition-colors">
            Designed & Built by Sengly
          </p>
          <span className="hidden md:block text-zinc-800">|</span>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>

        {/* Optional: Small Matcha accent if you still want that personal touch */}
        <div className="mt-4 flex gap-4">
          <div className="w-1 h-1 rounded-full bg-zinc-800" />
          <div className="w-1 h-1 rounded-full bg-zinc-800" />
          <div className="w-1 h-1 rounded-full bg-zinc-800" />
        </div>
      </div>
    </footer>
  );
}
