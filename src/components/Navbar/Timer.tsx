import { useEffect, useMemo } from "react";
import { useGameState, useTimerContext } from "../../hooks/GameHooks";
import { PiTimerBold } from "react-icons/pi";
import { IconText } from "../UI/IconText";
import { TimerColor } from "../../colors";
import * as Declarations from "../../declarations";

export const Timer = () => {
  const { gameState } = useGameState();
  const { seconds, setSeconds } = useTimerContext();

  const incrementTimer = () => {
    setSeconds((prev) => {
      if (prev == 999) {
        return 999;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startTimer = () => {
      interval = setInterval(incrementTimer, 1000);
    };

    const stopTimer = () => {
      if (interval !== null) {
        clearInterval(interval);
        interval = null;
      }
    };

    switch (gameState) {
      case Declarations.GameState.Start:
        startTimer();
        break;
      case Declarations.GameState.End:
        stopTimer();
        break;
      case Declarations.GameState.Reset:
        stopTimer();
        setSeconds(0);
        break;
    }
    return () => {
      stopTimer();
    };
  }, [gameState]);

  const formattedTimer = useMemo(
    () => seconds.toString().padStart(3, "0"),
    [seconds]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <PiTimerBold
        style={{
          fontSize: "8vh",
          color: TimerColor,
        }}
      />
      <IconText>{formattedTimer}</IconText>
    </div>
  );
};
