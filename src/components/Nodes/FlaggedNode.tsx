interface FlaggedNodeProps {
  backgroundColor: string;
  circleColor: string;
}

export const FlaggedNode = (props: FlaggedNodeProps) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: props.backgroundColor,
        zIndex: 2,
      }}
    >
      <div
        style={{
          height: "50%",
          width: "50%",
          borderRadius: "50%",
          backgroundColor: props.circleColor,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "10vh",
          height: "10vh",
          border: "0.3vh solid " + props.backgroundColor,
          zIndex: 2,
        }}
      ></div>
    </div>
  );
};
