import { Reactions } from "enums/reactions";
import AmazedIcon from "assets/icons/reactions/amazed.webp";
import LaughIcon from "assets/icons/reactions/laugh.webp";
import SadIcon from "assets/icons/reactions/sad.webp";
import SurprisedIcon from "assets/icons/reactions/surprised.webp";
import { values } from "lodash";

export const getReactionIcon = (reaction: Reactions) => {
  switch (reaction) {
    case Reactions.AMAZED:
      return AmazedIcon;
    case Reactions.LAUGH:
      return LaughIcon;
    case Reactions.SAD:
      return SadIcon;
    case Reactions.SURPRISED:
      return SurprisedIcon;
    default:
      throw Error(`Choose a reaction between: ${values(Reactions).join(",")}`);
  }
};
