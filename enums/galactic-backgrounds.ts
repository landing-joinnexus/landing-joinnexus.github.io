export enum GalacticColors {
  BLUE = "blue",
  RED = "red",
  DISABLE = "disable",
  NONE = "none",
  WHITE = "white",
  PURPLE = "purple",
}

export const galacticBackgrounds = {
  [GalacticColors.BLUE]: "linear-gradient(160deg,#1086e8,#b800e6)",
  [GalacticColors.RED]: "linear-gradient(160deg,red,#b800e6)",
  [GalacticColors.DISABLE]: "linear-gradient(160deg, rgb(173 193 210), rgb(77 75 78))",
  [GalacticColors.NONE]: "none",
  [GalacticColors.WHITE]: "#FFFFFF",
  [GalacticColors.PURPLE]: "#7000FF",
};
