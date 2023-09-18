type IndicatorColorsType = {
  readonly [key: number]: string;
};

export const BorderColor = "#1d9621";

export const PageBackground = "#006923";

export const ButtonColor = PageBackground;

export const OddNodePrimary = "#9dff00";

export const OddNodeSecondary = "#a19e7f";

export const EvenNodePrimary = "#569602";

export const EvenNodeSecondary = "#78765f";

export const FlaggedNodeBackground = "#a62424";

export const FlaggedNodeCircle = "#591313";

export const TimerColor = "#fcdb03";

export const EndScreenBackgroundColor = "#02add4";

export const IndicatorColors: IndicatorColorsType = {
  1: "#245eff",
  2: "#02fa30",
  3: "#fa0202",
  4: "#1942b3",
  5: "#5c0000",
  6: "#0580b5",
  7: "#000000",
  8: "#595858",
} as const;

export const BorderStyles = {
  borderTop: "solid 0.4vh " + BorderColor,
  borderLeft: "solid 0.4vh " + BorderColor,
  borderRight: "solid 0.4vh " + BorderColor,
  borderBottom: "solid 0.4vh " + BorderColor,
} as const;
