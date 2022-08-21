import Chat from "components/chat";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { useTranslation } from "react-i18next";
import { whoAmIService } from "services";

const sendMessage =
  (
    roomPin: string,
    userId: number,
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
  ) =>
  () => {
    setMessage("");
    whoAmIService.addGuess(roomPin, userId, message);
  };

export const BottomSection = () => {
  const { t } = useTranslation();
  const storyUserIsTheSameUserInSession = useStoryUserIsTheSameUserInSession();

  return (
    <Chat
      sendMessage={sendMessage}
      canAddMessage={storyUserIsTheSameUserInSession}
      defaultLabel={t("who_am_i.type_your_guess")}
    />
  );
};
