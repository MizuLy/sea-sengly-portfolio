import React from "react";
import { FiMail, FiGithub } from "react-icons/fi";
import { PiTelegramLogoDuotone } from "react-icons/pi";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6"
    >
      {/* Top Gradient for smooth transition from Projects */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-zinc-900 to-transparent opacity-50" />

      <div className="relative z-10 w-full max-w-4xl text-center space-y-12">
        {/* Sub-header */}
        <div data-aos="fade-up">
          <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold mb-4">
            Available for new opportunities
          </p>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
            Get in{" "}
            <span className="font-serif italic text-white/90">Touch</span>
          </h2>
        </div>

        {/* Main Contact Action */}
        <div data-aos="fade-up" data-aos-delay="200" className="py-10">
          <h1 className="group relative inline-block text-2xl md:text-4xl font-medium tracking-tight transition-colors hover:text-zinc-400">
            Ready to start a project?
            {/* The Animated Underline */}
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full" />
          </h1>
        </div>

        {/* Social Links */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="flex justify-center gap-8 pt-12"
        >
          <a
            href="https://github.com/MizuLy"
            target="_blank"
            className="text-zinc-500 hover:text-white transition-all hover:-translate-y-1"
          >
            <FiGithub size={24} />
          </a>

          <a
            href="https://t.me/MizuZz"
            target="_blank"
            className="text-zinc-500 hover:text-white transition-all hover:-translate-y-1"
          >
            <PiTelegramLogoDuotone size={24} />
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=senglysea12@gmail.com&su=Project+Inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-all hover:-translate-y-1"
          >
            <FiMail size={24} />
          </a>
        </div>
      </div>

      {/* Background Decor: A very subtle glow behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
