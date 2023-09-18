import { useFlagContext } from "../../hooks/GameHooks";
import { IconText } from "../UI/IconText";
import flag from "../../assets/flag.png";

export const Flags = () => {
  const { flagsLeft } = useFlagContext();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
      }}
    >
      <img
        style={{
          height: "10vh",
        }}
        src={flag}
        alt="F"
      />
      <IconText>{flagsLeft.toString()}</IconText>
    </div>
  );
};
