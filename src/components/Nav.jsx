import { useState } from "react";
import { HashLink as NavLink } from "react-router-hash-link";
import { FiMenu, FiX } from "react-icons/fi"; // Install react-icons if not already

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { name: "HOME", to: "/#home", offset: true },
    { name: "ABOUT", to: "/#about" },
    { name: "PROJECTS", to: "/#project" },
    { name: "CONTACT", to: "/#contact" },
  ];

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-5xl">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md h-[64px] rounded-full px-6 md:px-8 flex justify-between items-center shadow-2xl">
          {/* Logo */}
          <div className="flex-1">
            <h1
              onClick={scrollToTop}
              className="text-white font-light tracking-[0.3em] text-sm cursor-pointer hover:opacity-70 transition-opacity"
            >
              SENGLY<span className="font-bold">.DEV</span>
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center space-x-8 text-[10px] tracking-[0.2em] text-zinc-400 font-medium">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="hover:text-white transition-colors"
                >
                  <NavLink
                    smooth={!link.offset}
                    to={link.to}
                    onClick={link.offset ? scrollToTop : null}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Button / Mobile Toggle */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button className="hidden md:block relative px-6 py-2 bg-white text-black text-[10px] font-bold tracking-widest uppercase rounded-full hover:bg-zinc-200 transition-all">
              Get in Touch
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white text-2xl p-2"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-10">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.name}
              smooth={!link.offset}
              to={link.to}
              onClick={() => {
                link.offset ? scrollToTop() : setIsOpen(false);
              }}
              className={`text-4xl font-light tracking-[0.2em] text-white transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name === "HOME" ? (
                <span className="font-serif italic">Home</span>
              ) : (
                link.name
              )}
            </NavLink>
          ))}

          <button className="mt-8 px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.3em] uppercase rounded-full">
            Get in Touch
          </button>
        </div>
      </div>
    </>
  );
}
