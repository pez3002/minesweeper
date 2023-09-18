import { GameInfoProvider } from "../providers/GameInfoProvider";
import { GridProvider } from "../providers/GridProvider";
import { GameStateProvider } from "../providers/GameStateProvider";
import { PageBackground } from "../colors";
import { Grid } from "./Grid/Grid";
import { Navbar } from "./Navbar/Navbar";
import { EndScreen } from "./EndScreen/EndScreen";
import { useGameState } from "../hooks/GameHooks";
import * as Declarations from "../declarations";
import "./Minesweeper.css";

export const Minesweeper = () => {
  return (
    <GameInfoProvider>
      <GridProvider>
        <GameStateProvider>
          <Game />
        </GameStateProvider>
      </GridProvider>
    </GameInfoProvider>
  );
};

const Game = () => {
  const { gameState } = useGameState();

  let opacity = "";
  if (
    gameState == Declarations.GameState.End ||
    gameState == Declarations.GameState.Win
  ) {
    opacity = " opacity";
  }

  return (
    <>
      {gameState == Declarations.GameState.Win ||
      gameState == Declarations.GameState.End ? (
        <EndScreen />
      ) : null}
      <div
        style={{
          backgroundColor: PageBackground,
        }}
        className={"gameContainer" + opacity}
      >
        <Navbar />
        <div
          style={{
            position: "absolute",
            width: "150vh",
            height: "150vh",
            background: "linear-gradient(#00ccff, #d500f9)",
            animation: "rotate 4s linear infinite",
          }}
        ></div>
        <Grid />
      </div>
    </>
  );
};
