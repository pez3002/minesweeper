import * as Declarations from "../../declarations";
import { useMemo } from "react";

interface BasicNodeProps {
  children?: React.ReactNode;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleRightClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  node: Declarations.MinesweeperNode;
  backgroundColor: string;
}

export const BasicNode = (props: BasicNodeProps) => {
  const inset = useMemo(
    () =>
      `${props.node.borderStyle.borderTop} ${props.node.borderStyle.borderRight} ${props.node.borderStyle.borderBottom} ${props.node.borderStyle.borderLeft}`,
    [
      props.node.borderStyle.borderTop,
      props.node.borderStyle.borderRight,
      props.node.borderStyle.borderLeft,
      props.node.borderStyle.borderBottom,
    ]
  );

  if (props.node.borderStyle.borderTop != "0px") {
    console.log(inset);
  }

  return (
    <div
      onClick={props.handleClick}
      onContextMenu={props.handleRightClick}
      className={"gridNode"}
      style={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      {props.children}
      <div
        style={{
          position: "absolute",
          backgroundColor: props.backgroundColor,
          inset: inset,
        }}
      ></div>
    </div>
  );
};
