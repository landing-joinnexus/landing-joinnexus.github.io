import HostTitle from "components/host-title/host-title";
import { useUserIsHost } from "hooks/use-user-is-host";
import { RootState, useShallowEqualSelector } from "store";
import { formatUsername } from "utils";

interface Props {
  children?: React.ReactNode
}

export const UserInformationWrapper = (props: Props) => {
  const { userName, userId } = useShallowEqualSelector((state: RootState) => ({
    userName: state.user.name,
    userId: state.user.id,
  }));

  const isHost = useUserIsHost();

  return (
    <>
      <HostTitle show={isHost} userId={Number(userId)} />
      {props.children}
      <h3 className={"neon"}>{formatUsername(userName)}</h3>
    </>
  )
}
