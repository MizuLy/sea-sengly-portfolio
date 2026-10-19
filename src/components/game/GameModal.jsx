import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import MatchaRunner from "./MatchaRunner";

export default function GameModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500">
              You found it
            </p>
            <h2 className="text-white text-2xl font-light tracking-tighter">
              MATCHA <span className="font-bold">RUNNER</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close game"
            className="text-zinc-400 hover:text-white text-2xl p-2 transition-colors"
          >
            <FiX />
          </button>
        </div>

        <MatchaRunner />

        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          Space / ↑ / tap to jump · ↓ to duck · Esc to leave
        </p>
      </div>
    </div>
  );
}
