import { useContext } from "react";
import { GridDataContext } from "../providers/GameInfoProvider";
import { GridContext } from "../providers/GridProvider";

export const useGridData = () => {
  const context = useContext(GridDataContext);
  if (!context) {
    throw new Error("use(Context) must be used within the Context Provider");
  }
  return context;
};

export const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("use(Context) must be used within the Context Provider");
  }
  return context;
};
