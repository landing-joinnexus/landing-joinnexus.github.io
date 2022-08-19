import { size, subtract } from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./messages.module.css";

const Messages = () => {
  const { t } = useTranslation();
  const { gameChat } = useShallowEqualSelector((state: RootState) => ({
    gameChat: state.room.gameState?.gameChat,
  }));

  const chatSize = size(gameChat);

  useEffect(() => {
    const chat = document.getElementById("chat");
    const difference = subtract(chat?.scrollTop || 0, chat?.scrollHeight || 0);
    const shouldScroll = difference < 100;
    if (shouldScroll) {
      chat?.scroll({ behavior: "smooth", top: chat.scrollHeight });
    }
  }, [chatSize]);

  if (chatSize) {
    return (
      <div id="chat" className={`${Styles.container} neonScroll noHorizontalScroll`}>
        {gameChat?.map(message => (
          <p className={Styles.message} key={`${message.username}_${message.timestamp}`}>
            <label className="text neon">{message.username}</label>:{" "}
            <label className="text">{message.message}</label>
          </p>
        ))}
      </div>
    );
  }

  return <h2 className="text">{t("common.no_messages")}</h2>;
};

export default Messages;
