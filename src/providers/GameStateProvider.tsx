import { createContext, useState, useEffect } from "react";
import { createGrid, populateGrid, checkSquare } from "../utils/GridFunctions";
import { useGrid, useGridData } from "../hooks/GridHooks";
import { usePositionContext, useFlagContext } from "../hooks/GameHooks";
import * as Declarations from "../declarations";

export const GameStateContext = createContext<{
  gameState: Declarations.GameState;
  setGameState: React.Dispatch<React.SetStateAction<Declarations.GameState>>;
} | null>(null);

export const GameStateProvider = (props: Declarations.Children) => {
  const [gameState, setGameState] = useState<Declarations.GameState>(
    Declarations.GameState.Reset
  );
  const { grid, setGrid } = useGrid();
  const { gridData } = useGridData();
  const { startingPos } = usePositionContext();
  const { setFlagsLeft } = useFlagContext();

  useEffect(() => {
    switch (gameState) {
      case Declarations.GameState.Start:
        console.log("new game");
        setGrid(
          checkSquare(
            startingPos[0],
            startingPos[1],
            populateGrid(
              grid,
              gridData.numFlagged,
              startingPos,
              gridData.safeRadius
            )
          )
        );
        break;
      case Declarations.GameState.Reset:
        setGrid(createGrid(gridData.row, gridData.col));
        console.log("creating new grid");
        setFlagsLeft(gridData.numFlagged);
        break;
    }
  }, [gameState, gridData]);

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {props.children}
    </GameStateContext.Provider>
  );
};
