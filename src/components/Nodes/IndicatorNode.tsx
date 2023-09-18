import { SafeNode } from "./SafeNode";
import { IndicatorColors } from "../../colors";
import * as Declarations from "../../declarations";

interface IndicatorNodeProps {
  node: Declarations.MinesweeperNode;
}

export const IndicatorNode = (props: IndicatorNodeProps) => {
  return (
    <SafeNode node={props.node}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            textAlign: "center",
            fontSize: "6vh",
            textShadow:
              "0 0 2vh " +
              IndicatorColors[props.node.indicatorNumber] +
              ", 0 0 4vh " +
              IndicatorColors[props.node.indicatorNumber],
            color: "white",
          }}
        >
          {props.node.indicatorNumber}
        </span>
      </div>
    </SafeNode>
  );
};
