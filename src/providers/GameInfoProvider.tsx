import { createContext, useState } from "react";
import * as Declarations from "../declarations";

const defaultGridData: GridDataInterface = {
  row: 8,
  col: 10,
  numFlagged: 10,
  safeRadius: 1,
};

interface GridDataInterface {
  row: number;
  col: number;
  numFlagged: number;
  safeRadius: number;
}

export const GridDataContext = createContext<{
  gridData: GridDataInterface;
  setGridData: React.Dispatch<React.SetStateAction<GridDataInterface>>;
} | null>(null);

export const FlagContext = createContext<{
  flagsLeft: number;
  setFlagsLeft: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);
export const PositionContext = createContext<{
  startingPos: [number, number];
  setStartingPos: React.Dispatch<React.SetStateAction<[number, number]>>;
} | null>(null);
export const TimerContext = createContext<{
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const GameInfoProvider = (props: Declarations.Children) => {
  const [startingPos, setStartingPos] = useState<[number, number]>([-1, -1]);
  const [gridData, setGridData] = useState<GridDataInterface>(defaultGridData);
  const [flagsLeft, setFlagsLeft] = useState<number>(gridData.numFlagged);
  const [seconds, setSeconds] = useState<number>(0);

  return (
    <FlagContext.Provider value={{ flagsLeft, setFlagsLeft }}>
      <PositionContext.Provider value={{ startingPos, setStartingPos }}>
        <TimerContext.Provider value={{ seconds, setSeconds }}>
          <GridDataContext.Provider value={{ gridData, setGridData }}>
            {props.children}
          </GridDataContext.Provider>
        </TimerContext.Provider>
      </PositionContext.Provider>
    </FlagContext.Provider>
  );
};
