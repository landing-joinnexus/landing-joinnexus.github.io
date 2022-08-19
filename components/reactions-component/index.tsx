import ReactionButton from "components/reaction-button";
import { Reactions } from "enums/reactions";
import { keys } from "lodash";
import Styles from "./index.module.css";

interface Props {
  style?: string;
  displayReactionCounter: boolean;
}

const ReactionsComponent = (props: Props) => {
  const { displayReactionCounter, style } = props;

  const reactions = keys(Reactions);
  const className = `centerContent ${
    displayReactionCounter ? Styles.containerResults : Styles.container
  } ${style}`;


  return (
    <div
      className={className}
    >
      {reactions.map(reaction => (
        <ReactionButton
          key={reaction}
          reaction={Reactions[reaction as keyof typeof Reactions]}
          displayCounter={displayReactionCounter}
        ></ReactionButton>
      ))}
    </div>
  );
};

export default ReactionsComponent;
