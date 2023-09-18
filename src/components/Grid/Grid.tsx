import { useGrid, useGridData } from "../../hooks/GridHooks";
import { useGameState } from "../../hooks/GameHooks";
import { useEffect } from "react";
import { OddNodePrimary, EvenNodePrimary } from "../../colors";
import { GridNode } from "./GridNode";
import * as Declarations from "../../declarations";
import * as GridFunctions from "../../utils/GridFunctions";

export const Grid = () => {
  const { grid, setGrid } = useGrid();
  const { gridData } = useGridData();
  const { setGameState } = useGameState();

  const checkSquare = (row: number, col: number) => {
    setGrid(GridFunctions.checkSquare(row, col, grid));
  };

  const setNodeShow = (row: number, col: number, value: boolean) => {
    setGrid((prev) => {
      GridFunctions.setNodeShow(row, col, prev, value);
      return prev;
    });
  };

  const setFlagShow = (row: number, col: number, value: boolean) => {
    setGrid((prev) => {
      GridFunctions.setFlagShow(row, col, prev, value);
      return prev;
    });
  };

  const setAllBorders = (grid: Declarations.Grid) => {
    setGrid(GridFunctions.setAllBorders(grid));
  };

  useEffect(() => {
    if (GridFunctions.checkWin(grid, gridData.numFlagged)) {
      setGameState(Declarations.GameState.Win);
    }
  }, [grid]);

  return (
    <div className={"gridContainer"}>
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={"grid"}>
            {row.map((node, colIndex) => {
              let color = OddNodePrimary;
              if ((rowIndex + colIndex) % 2 == 0) {
                color = EvenNodePrimary;
              }

              return (
                <GridNode
                  key={colIndex}
                  node={node}
                  backgroundColor={color}
                  setAllBorders={setAllBorders}
                  checkSquare={checkSquare}
                  setNodeShow={setNodeShow}
                  setFlagShow={setFlagShow}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
