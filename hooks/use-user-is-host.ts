import { useShallowEqualSelector, RootState } from "store";

export const useUserIsHost = () => {
  const { hostUserId, userId } = useShallowEqualSelector((state: RootState) => ({
    hostUserId: state.room.hostUserId,
    userId: state.user.id,
  }));

  return hostUserId === userId;
};
