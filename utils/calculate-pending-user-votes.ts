import { keys } from "lodash";
import { UserDetail } from "models";
import { formatUsername } from "./format-username";

export const calculatePendingUserVotes = (
  usersDetails: Record<string, UserDetail>,
  // tslint:disable-next-line: no-any
  votes: Record<number, any>,
): Array<string> => {
  const userIds = keys(usersDetails);
  const userWithVote = keys(votes);
  const pendingUsers = [];
  for (const userId of userIds) {
    const hasVoted = userWithVote.includes(String(userId));
    const userName = usersDetails[userId].name;
    if (!hasVoted && userName) {
      pendingUsers.push(formatUsername(userName));
    }
  }
  return pendingUsers;
};
