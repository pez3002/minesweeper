import { ButtonColor } from "../../colors";

interface ButtonProps {
  children: string;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      style={{
        background: "none",
        backgroundColor: ButtonColor,
        position: "absolute",
        marginTop: "30vh",
        zIndex: 3,
        color: "white",
        padding: "3vh 8vh",
        outline: "inherit",
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
