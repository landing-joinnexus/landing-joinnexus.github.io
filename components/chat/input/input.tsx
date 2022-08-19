import { Divider, TextField } from "@mui/material";
import SendIcon from "assets/icons/platform/send.svg";
import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { size, trim } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./input.module.css";

// tslint:disable-next-line: no-any
const handleEnter: any =
  (send: () => void) =>
  (event: KeyboardEvent): void => {
    if (event?.key === "Enter") {
      send();
    }
  };

interface Props {
  sendMessage: (
    roomPin: string,
    userId: number,
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
  defaultLabel?: string;
  canAddMessage: boolean;
}

const Input = (props: Props) => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const { userId, roomPin, votes } = useShallowEqualSelector((state: RootState) => ({
    userId: state.user.id,
    roomPin: state.room.pin,
    votes: state.room.gameState?.votes,
  }));

  if (!props.canAddMessage) return null;

  if (votes && userId) {
    const vote = votes[Number(userId)];
    if (vote) {
      return (
        <h2 className="neon">
          {t("charades.awesome_you_discovered_the_word")}: {vote}
        </h2>
      );
    }
  }

  const sendAction = props.sendMessage(roomPin as string, userId as number, message, setMessage);

  return (
    <>
      <Divider />
      <br />
      <div className={Styles.chatContainer}>
        <TextField
          className={Styles.chatInput}
          value={message}
          onChange={m => setMessage(m.target.value)}
          onKeyPress={handleEnter(sendAction)}
          label={props.defaultLabel}
        />
        <GameButton
          onClick={sendAction}
          backgroundImage={GalacticColors.BLUE}
          isRound={true}
          imageSrc={SendIcon}
          isDisabled={!size(trim(message))}
        />
      </div>
    </>
  );
};

export default Input;
