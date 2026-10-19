import { createContext, useContext } from "react";

export const GameContext = createContext({ openGame: () => {} });

export const useGame = () => useContext(GameContext);
