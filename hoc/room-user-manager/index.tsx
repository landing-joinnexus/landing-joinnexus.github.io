import { goToFeed } from "utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import useWebSocket from "react-use-websocket";
import { gameManager } from "services/game-manager.service";
import { RootState, useShallowEqualSelector } from "store";
import { cleanRoomState, setRoomState } from "store/room.store";
import { cleanStore } from "store/video.store";
import { environment } from "environment";
import { WebSocketEvent } from "enums/websocket-event";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Props {
  children?: React.ReactNode;
}

export const RoomUserManager = (props: Props) => {
  const { roomPin, userId, userName } = useShallowEqualSelector((state: RootState) => ({
    roomPin: state.room.pin as string,
    userId: state.user.id as number,
    userName: state.user.name as string,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { sendMessage, lastMessage, readyState } = useWebSocket(environment.websocketUrl, {
    shouldReconnect: () => true,
    reconnectAttempts: 2,
    reconnectInterval: 5000,
    retryOnError: true,
  });

  gameManager.nativeSendMessage = sendMessage;

  useEffect(() => {
    const hasAllDependenciesReady = userId && userName && roomPin && readyState;
    if (hasAllDependenciesReady) {
      const joinRoomMessage = {
        event: WebSocketEvent.JOIN_ROOM,
        payload: { userId, name: userName, roomPin, clientDateAt: new Date().getTime() },
      };
      sendMessage(JSON.stringify(joinRoomMessage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userName, roomPin, readyState]);

  useEffect(() => {
    if (!lastMessage) return;

    const data = JSON.parse(lastMessage.data);
    switch (data.event) {
      case WebSocketEvent.UPDATE_ROOM:
        dispatch(setRoomState(data.payload));
        break;
      case WebSocketEvent.ROOM_DELETED:
        dispatch(cleanRoomState());
        dispatch(cleanStore());
        goToFeed(navigate)();
        toast.info(t("rooms.owner_deleted_your_room"));
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  return <>{props.children}</>;
};
