import * as Declarations from "../declarations";
import { BorderInset } from "../colors";

export const getRandomIndex = (
  rowMax: number,
  colMax: number
): [number, number] => {
  return [
    Math.floor(Math.random() * rowMax),
    Math.floor(Math.random() * colMax),
  ];
};

export const checkBounds = (
  row: number,
  col: number,
  rowMax: number,
  colMax: number
): boolean => {
  return row >= 0 && row < rowMax && col >= 0 && col < colMax;
};

export const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, -1],
];

export const fourDirections = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const countFlags = (
  row: number,
  col: number,
  grid: Declarations.Grid
): number => {
  let count = 0;

  for (const direction of directions) {
    const resultingDirection = [row + direction[0], col + direction[1]];
    if (
      checkBounds(
        resultingDirection[0],
        resultingDirection[1],
        grid.length,
        grid[0].length
      ) &&
      grid[resultingDirection[0]][resultingDirection[1]].kind ==
        Declarations.NodeKind.Flagged
    ) {
      count = count + 1;
    }
  }
  return count;
};

export const createGrid = (rows: number, cols: number): Declarations.Grid => {
  const result: Declarations.Grid = [];

  for (let i = 0; i < rows; i++) {
    const row: Array<Declarations.MinesweeperNode> = [];
    for (let j = 0; j < cols; j++) {
      const node: Declarations.MinesweeperNode = {
        kind: Declarations.NodeKind.Unassigned,
        indicatorNumber: 0,
        show: false,
        flagShow: false,
        borderStyle: {
          borderBottom: "0px",
          borderLeft: "0px",
          borderRight: "0px",
          borderTop: "0px",
        },
        rowPos: i,
        colPos: j,
      };
      row.push(node);
    }
    result.push(row);
  }

  return result;
};

export const inRadius = (
  safeRadius: number,
  safePos: [number, number],
  checkPos: [number, number]
): boolean => {
  const dx = Math.abs(checkPos[0] - safePos[0]);
  const dy = Math.abs(checkPos[1] - safePos[1]);
  return dx <= safeRadius && dy <= safeRadius;
};

export const populateGrid = (
  grid: Declarations.Grid,
  numFlagged: number,
  safePos: [number, number],
  safeRadius: number
): Declarations.Grid => {
  const newGrid: Declarations.Grid = [...grid];

  while (numFlagged > 0) {
    const [randomRow, randomCol] = getRandomIndex(
      newGrid.length,
      newGrid[0].length
    );
    if (
      newGrid[randomRow][randomCol].kind == Declarations.NodeKind.Unassigned &&
      !inRadius(safeRadius, safePos, [randomRow, randomCol])
    ) {
      newGrid[randomRow][randomCol].kind = Declarations.NodeKind.Flagged;
      numFlagged--;
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (newGrid[i][j].kind == Declarations.NodeKind.Flagged) {
        continue;
      }
      const numFlags = countFlags(i, j, newGrid);
      if (newGrid[i][j].kind == Declarations.NodeKind.Unassigned) {
        newGrid[i][j].kind = Declarations.NodeKind.Safe;
      }
      if (numFlags > 0) {
        newGrid[i][j].kind = Declarations.NodeKind.Indicator;
      }

      newGrid[i][j].indicatorNumber = numFlags;
    }
  }

  return newGrid;
};

export const setBorders = (
  row: number,
  col: number,
  grid: Declarations.Grid
) => {
  const startingNode = grid[row][col];

  if (
    !startingNode.show ||
    startingNode.kind != Declarations.NodeKind.Indicator
  ) {
    return;
  }
  emptyBorder(row, col, grid);

  for (const direction of fourDirections) {
    const resultingDirection = [row + direction[0], col + direction[1]];

    if (
      !checkBounds(
        row + direction[0],
        col + direction[1],
        grid.length,
        grid[0].length
      )
    ) {
      continue;
    }

    const currentNode = grid[resultingDirection[0]][resultingDirection[1]];

    if (!currentNode.show) {
      if (direction[0] == -1 && direction[1] == 0) {
        currentNode.borderStyle.borderBottom = BorderInset;
      }
      if (direction[0] == 1 && direction[1] == 0) {
        currentNode.borderStyle.borderTop = BorderInset;
      }
      if (direction[0] == 0 && direction[1] == 1) {
        currentNode.borderStyle.borderLeft = BorderInset;
      }
      if (direction[0] == 0 && direction[1] == -1) {
        currentNode.borderStyle.borderRight = BorderInset;
      }
    }
  }
};

export const checkWin = (
  grid: Declarations.Grid,
  numFlagged: number
): boolean => {
  let totalNodes = grid.length * grid[0].length - numFlagged;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const currentNode = grid[i][j];
      if (
        currentNode.kind != Declarations.NodeKind.Flagged &&
        currentNode.show
      ) {
        totalNodes = totalNodes - 1;
      }
    }
  }

  return totalNodes == 0;
};

export const setAllBorders = (grid: Declarations.Grid): Declarations.Grid => {
  const newGrid = [...grid];

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[0].length; j++) {
      setBorders(i, j, newGrid);
    }
  }
  return newGrid;
};

export const dfs = (
  row: number,
  col: number,
  grid: Declarations.Grid,
  firstCheck: boolean
) => {
  if (!checkBounds(row, col, grid.length, grid[0].length)) {
    return;
  }
  if (grid[row][col].kind == Declarations.NodeKind.Indicator) {
    grid[row][col].show = true;
    return;
  }
  if (grid[row][col].flagShow) {
    return;
  }
  if (!firstCheck && grid[row][col].show) {
    return;
  }

  grid[row][col].show = true;

  for (const direction of directions) {
    const resultingDirection = [row + direction[0], col + direction[1]];
    dfs(resultingDirection[0], resultingDirection[1], grid, false);
  }
  return;
};

export const checkSquare = (
  row: number,
  col: number,
  grid: Declarations.Grid
): Declarations.Grid => {
  dfs(row, col, grid, true);

  const newGrid = setAllBorders(grid);

  return newGrid;
};

export const setNodeShow = (
  row: number,
  col: number,
  grid: Declarations.Grid,
  value: boolean
) => {
  if (checkBounds(row, col, grid.length, grid[0].length)) {
    grid[row][col].show = value;
  }
};

export const setFlagShow = (
  row: number,
  col: number,
  grid: Declarations.Grid,
  value: boolean
) => {
  if (checkBounds(row, col, grid.length, grid[0].length)) {
    grid[row][col].flagShow = value;
  }
};

export const emptyBorder = (
  row: number,
  col: number,
  grid: Declarations.Grid
) => {
  grid[row][col].borderStyle = {
    borderTop: "0px",
    borderBottom: "0px",
    borderLeft: "0px",
    borderRight: "0px",
  };
};
