import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";

const RoomTitle = () => {
  const { t } = useTranslation();

  const { hostUserId, hostUsername, currentUserId } = useShallowEqualSelector(
    (state: RootState) => ({
      hostUserId: state.room.hostUserId,
      hostUsername: state.room.hostUsername,
      currentUserId: state.user.id,
    }),
  );

  const waitingForHostTitle = `${t("room.waiting_for")} ${hostUsername} ${t(
    "room.to_select_a_game",
  )}`;

  const title = currentUserId === hostUserId ? t("room.choose_a_game") : waitingForHostTitle;

  return (
    <h1 data-test-id="room-title" className="text neon">
      {title}
    </h1>
  );
};

export default RoomTitle;
