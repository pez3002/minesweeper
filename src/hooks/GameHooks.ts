import { useContext } from "react";
import { GameStateContext } from "../providers/GameStateProvider";
import {
  FlagContext,
  TimerContext,
  PositionContext,
} from "../providers/GameInfoProvider";

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("use(Context) must be used within the Context Provider");
  }
  return context;
};

export const useFlagContext = () => {
  const context = useContext(FlagContext);
  if (!context) {
    throw new Error("use(Context) must be used within the Context Provider");
  }
  return context;
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("use(Context) must be used within the Context Provider");
  }
  return context;
};

export const usePositionContext = () => {
  const context = useContext(PositionContext);
  if (!context) {
    throw new Error("use(Context) must be used within the Context Provider");
  }
  return context;
};
