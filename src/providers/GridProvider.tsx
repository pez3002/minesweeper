import { createContext, useState, useMemo } from "react";
import { createGrid } from "../utils/GridFunctions";
import { useGridData } from "../hooks/GridHooks";
import * as Declarations from "../declarations";

export const GridContext = createContext<{
  grid: Declarations.Grid;
  setGrid: React.Dispatch<React.SetStateAction<Declarations.Grid>>;
} | null>(null);

export const GridProvider = (props: Declarations.Children) => {
  const { gridData } = useGridData();

  const createGridMemo = useMemo(
    () => createGrid(gridData.row, gridData.col),
    [gridData]
  );

  const [grid, setGrid] = useState<Declarations.Grid>(createGridMemo);

  return (
    <GridContext.Provider value={{ grid, setGrid }}>
      {props.children}
    </GridContext.Provider>
  );
};
