import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Mainrouter from "./routes/Mainrouter";
import CustomScrollbar from "./components/CustomScrollbar";

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div>
      <Mainrouter />
      <CustomScrollbar />
    </div>
  );
}
