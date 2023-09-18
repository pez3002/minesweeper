import { Timer } from "./Timer";
import { Flags } from "./Flags";

export const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "space-around",
        padding: "1vh",
      }}
    >
      <Flags />
      <Timer />
    </div>
  );
};
