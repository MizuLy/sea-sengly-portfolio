import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Mainrouter from "./routes/Mainrouter";

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div>
      <Mainrouter />
    </div>
  );
}
