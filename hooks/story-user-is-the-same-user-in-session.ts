import { RootState, useShallowEqualSelector } from "store";

export const useStoryUserIsTheSameUserInSession = () => {
  const { userForStoryTime, currentUserId } = useShallowEqualSelector((state: RootState) => ({
    userForStoryTime: state.room.gameState?.userForStoryTime,
    currentUserId: state.user.id,
  }));
  return currentUserId === userForStoryTime;
};
