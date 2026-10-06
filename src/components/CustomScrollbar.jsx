import { useEffect, useState } from "react";

export default function CustomScrollbar() {
  const [scrollbar, setScrollbar] = useState({ visible: false, height: 0, top: 0 });

  useEffect(() => {
    const updateScrollbar = () => {
      const { documentElement } = document;
      const viewportHeight = window.innerHeight;
      const pageHeight = documentElement.scrollHeight;
      const scrollableHeight = pageHeight - viewportHeight;

      if (scrollableHeight <= 0) {
        setScrollbar({ visible: false, height: 0, top: 0 });
        return;
      }

      const height = Math.max((viewportHeight / pageHeight) * viewportHeight, 36);
      const maxTop = viewportHeight - height;
      const top = (window.scrollY / scrollableHeight) * maxTop;

      setScrollbar({ visible: true, height, top });
    };

    updateScrollbar();
    window.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, []);

  if (!scrollbar.visible) return null;

  return (
    <div className="pointer-events-none fixed right-1 top-0 z-[9999] h-screen w-2">
      <div
        className="absolute right-0 w-2 rounded-full bg-black"
        style={{ height: `${scrollbar.height}px`, top: `${scrollbar.top}px` }}
      />
    </div>
  );
}
