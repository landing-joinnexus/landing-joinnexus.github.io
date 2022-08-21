import Chat from "components/chat";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { useTranslation } from "react-i18next";
import { charadesService } from "services";
import { RootState, useShallowEqualSelector } from "store";
import { getUserNameFormatted } from "utils";

const sendMessage =
  (
    roomPin: string,
    userId: number,
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
  ) =>
  () => {
    setMessage("");
    charadesService.addGuess(roomPin, userId, message);
  };

export const BottomSection = () => {
  const { t } = useTranslation();
  const { userForStoryTime, usersDetails } = useShallowEqualSelector((state: RootState) => ({
    userForStoryTime: state.room.gameState?.userForStoryTime,
    usersDetails: state.room.usersDetails,
  }));

  const userNameFormatted = getUserNameFormatted(usersDetails, userForStoryTime as number);

  const label = `${t("charades.type_the_word_that")} ${userNameFormatted} ${t(
    "charades.is_acting_out",
  )}`;

  const storyUserIsTheSameUserInSession = useStoryUserIsTheSameUserInSession();

  return (
    <Chat
      sendMessage={sendMessage}
      canAddMessage={!storyUserIsTheSameUserInSession}
      defaultLabel={label}
    />
  );
};
