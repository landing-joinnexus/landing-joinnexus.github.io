import { UserDetail } from "models";
import { formatUsername } from "utils";

export const getUserNameFormatted = (
  usersDetails: Record<string, UserDetail>,
  userForStoryTime: number,
) => {
  const userDetail = usersDetails[String(userForStoryTime)];
  const userName = userDetail?.name;
  return formatUsername(userName);
};
