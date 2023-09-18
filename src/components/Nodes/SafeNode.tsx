import * as Declarations from "../../declarations";
import { OddNodeSecondary, EvenNodeSecondary } from "../../colors";

interface SafeNodeProps {
  children?: React.ReactNode;
  node: Declarations.MinesweeperNode;
}

export const SafeNode = (props: SafeNodeProps) => {
  let color = OddNodeSecondary;
  if ((props.node.rowPos + props.node.colPos) % 2 == 0) {
    color = EvenNodeSecondary;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color,
        zIndex: 2,
      }}
    >
      {props.children}
    </div>
  );
};
