interface IconTextChildren {
  children: string;
}

export const IconText = (props: IconTextChildren) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "24px",
        color: "white",
      }}
    >
      <h3>{props.children}</h3>
    </div>
  );
};
