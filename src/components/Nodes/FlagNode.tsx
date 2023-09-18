import flag from "../../assets/flag.png";

export const FlagNode = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3,
      }}
    >
      <img
        style={{
          width: "80%",
          height: "80%",
        }}
        src={flag}
        alt={"F"}
      />
    </div>
  );
};
