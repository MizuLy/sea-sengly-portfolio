import { useEffect, useRef } from "react";

// Fires `onMatch` when the user types `code` anywhere outside a form field.
export default function useSecretCode(code, onMatch) {
  const buffer = useRef("");
  const callback = useRef(onMatch);

  useEffect(() => {
    callback.current = onMatch;
  }, [onMatch]);

  useEffect(() => {
    const handleKey = (e) => {
      const el = e.target;
      if (
        el instanceof HTMLElement &&
        (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
      ) {
        return;
      }
      if (e.key.length !== 1) return;

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-code.length);
      if (buffer.current === code) {
        buffer.current = "";
        callback.current();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [code]);
}
