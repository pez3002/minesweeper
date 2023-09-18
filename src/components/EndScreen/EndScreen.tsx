import { useTimerContext } from "../../hooks/GameHooks";
import * as Declarations from "../../declarations";
import { EndScreenBackgroundColor } from "../../colors";
import { useGameState } from "../../hooks/GameHooks";
import { PiTimerBold } from "react-icons/pi";
import { TimerColor } from "../../colors";
import { IconText } from "../UI/IconText";
import { Button } from "../UI/Button";

export const EndScreen = () => {
  const { seconds } = useTimerContext();
  const { gameState, setGameState } = useGameState();

  const handleOnClick = () => {
    setGameState(Declarations.GameState.Reset);
  };

  let timer = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1vh",
      }}
    >
      <div
        style={{
          width: "4vh",
          height: ".25vh",
          backgroundColor: "white",
        }}
      ></div>
    </div>
  );

  if (gameState == Declarations.GameState.Win) {
    const formattedTimer = seconds.toString().padStart(3, "0");
    timer = <IconText>{formattedTimer}</IconText>;
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          padding: "10vh 5vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          backgroundColor: EndScreenBackgroundColor,
          zIndex: 3,
        }}
      >
        <PiTimerBold
          style={{
            fontSize: "8vh",
            color: TimerColor,
          }}
        />
        {timer}
      </div>
      <Button onClick={handleOnClick}>
        {gameState == Declarations.GameState.Win ? "Play again!" : "Try Again!"}
      </Button>
    </>
  );
};
