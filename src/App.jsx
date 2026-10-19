import AOS from "aos";
import "aos/dist/aos.css";
import { useCallback, useEffect, useMemo, useState } from "react";

import Mainrouter from "./routes/Mainrouter";
import CustomScrollbar from "./components/CustomScrollbar";
import GameModal from "./components/game/GameModal";
import { GameContext } from "./context/GameContext";
import useSecretCode from "./hooks/useSecretCode";

export default function App() {
  const [gameOpen, setGameOpen] = useState(false);
  const openGame = useCallback(() => setGameOpen(true), []);
  const closeGame = useCallback(() => setGameOpen(false), []);
  const gameContext = useMemo(() => ({ openGame }), [openGame]);

  useSecretCode("play", openGame);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <GameContext.Provider value={gameContext}>
      <Mainrouter />
      <CustomScrollbar />
      <GameModal open={gameOpen} onClose={closeGame} />
    </GameContext.Provider>
  );
}
