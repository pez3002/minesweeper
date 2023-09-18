import { ReactNode } from "react";

export interface Children {
  children?: ReactNode;
}

export enum GameState {
  Start,
  End,
  Reset,
  Win,
}

export enum NodeKind {
  Safe,
  Indicator,
  Flagged,
  Unassigned,
}

export type Grid = Array<Array<MinesweeperNode>>;

export type BorderStyle = {
  borderTop: string;
  borderBottom: string;
  borderLeft: string;
  borderRight: string;
};

export type MinesweeperNode = {
  kind: NodeKind;
  indicatorNumber: number;
  show: boolean;
  flagShow: boolean;
  rowPos: number;
  colPos: number;
  borderStyle: BorderStyle;
};
