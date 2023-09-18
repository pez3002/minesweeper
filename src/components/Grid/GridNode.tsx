import * as Declarations from "../../declarations";
import { FlaggedNode } from "../Nodes/FlaggedNode";
import { FlagNode } from "../Nodes/FlagNode";
import { SafeNode } from "../Nodes/SafeNode";
import { IndicatorNode } from "../Nodes/IndicatorNode";
import { BasicNode } from "../Nodes/BasicNode";
import { useFlagContext } from "../../hooks/GameHooks";
import { useGrid } from "../../hooks/GridHooks";
import { useGameState, usePositionContext } from "../../hooks/GameHooks";
import { FlaggedNodeBackground, FlaggedNodeCircle } from "../../colors";
import { useEffect, useState, useMemo } from "react";

interface GridNodeProps {
  node: Declarations.MinesweeperNode;
  backgroundColor: string;
  setAllBorders: (grid: Declarations.Grid) => void;
  checkSquare: (row: number, col: number) => void;
  setNodeShow: (row: number, col: number, value: boolean) => void;
  setFlagShow: (row: number, col: number, value: boolean) => void;
}

export const GridNode = (props: GridNodeProps) => {
  const { gameState, setGameState } = useGameState();
  const { setStartingPos } = usePositionContext();
  const { grid } = useGrid();
  const [show, setShow] = useState(props.node.show);
  const { flagsLeft, setFlagsLeft } = useFlagContext();

  const FlagShowMemo = useMemo(
    () => props.node.flagShow,
    [props.node.flagShow]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (show) {
      return;
    }

    switch (gameState) {
      case Declarations.GameState.Reset:
        setStartingPos([props.node.rowPos, props.node.colPos]);
        setGameState(Declarations.GameState.Start);
        break;
      case Declarations.GameState.Start:
        if (!FlagShowMemo) {
          setShow(true);
          props.setNodeShow(props.node.rowPos, props.node.colPos, true);
        }
        break;
    }

    if (gameState != Declarations.GameState.Start) {
      return;
    }

    props.setAllBorders(grid);

    switch (props.node.kind) {
      case Declarations.NodeKind.Safe:
        props.checkSquare(props.node.rowPos, props.node.colPos);
        break;
      case Declarations.NodeKind.Flagged:
        setGameState(Declarations.GameState.End);
        break;
    }
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (show) {
      return;
    }
    switch (gameState) {
      case Declarations.GameState.Start:
        if (!FlagShowMemo && flagsLeft > 0) {
          setFlagsLeft((prev) => prev - 1);
          props.setFlagShow(
            props.node.rowPos,
            props.node.colPos,
            !FlagShowMemo
          );
        }
        if (FlagShowMemo) {
          setFlagsLeft((prev) => prev + 1);
          props.setFlagShow(
            props.node.rowPos,
            props.node.colPos,
            !FlagShowMemo
          );
        }
        break;
    }
  };

  useEffect(() => {
    setShow(props.node.show);
    props.setAllBorders(grid);
  }, [props.node.show]);

  return (
    <BasicNode
      handleClick={handleClick}
      handleRightClick={handleRightClick}
      backgroundColor={props.backgroundColor}
      node={props.node}
    >
      {props.node.flagShow ? <FlagNode /> : null}
      {show ? (
        props.node.kind == Declarations.NodeKind.Flagged ? (
          <FlaggedNode
            backgroundColor={FlaggedNodeBackground}
            circleColor={FlaggedNodeCircle}
          />
        ) : props.node.indicatorNumber > 0 ? (
          <IndicatorNode node={props.node} />
        ) : (
          <SafeNode node={props.node} />
        )
      ) : null}
    </BasicNode>
  );
};
