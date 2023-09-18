import * as Declarations from "../../declarations";
import { useGameState } from "../../hooks/GameHooks";

interface BasicNodeProps {
  children?: React.ReactNode;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleRightClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  node: Declarations.MinesweeperNode;
  backgroundColor: string;
}

export const BasicNode = (props: BasicNodeProps) => {
  const { gameState } = useGameState();

  let opacity = "";
  if (
    gameState == Declarations.GameState.End ||
    gameState == Declarations.GameState.Win
  ) {
    opacity = "opacity";
  }

  return (
    <div
      onClick={props.handleClick}
      onContextMenu={props.handleRightClick}
      className={"gridNode"}
      style={{
        backgroundColor: props.backgroundColor,
      }}
    >
      {props.children}
      <div
        className={opacity}
        style={{
          position: "absolute",
          zIndex: 1,
          width: "10vh",
          height: "10vh",
          borderTop: props.node.borderStyle.borderTop,
          borderBottom: props.node.borderStyle.borderBottom,
          borderRight: props.node.borderStyle.borderRight,
          borderLeft: props.node.borderStyle.borderLeft,
        }}
      ></div>
    </div>
  );
};
