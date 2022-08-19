import { head, size } from "lodash";
import { TFunction } from "react-i18next";

export const waitingVoteMessage = (
  t: TFunction<"translation", undefined>,
  users: Array<string>,
  singleSuffix = "common.votes",
  pluralSuffix = "common.vote"
): string => {
  const usersSize = size(users);
  switch (usersSize) {
    case 0:
      return "";
    case 1:
      return `${t("common.waiting_for")} ${head(users)} ${t(singleSuffix)}`;
    default:
      return `${t("common.waiting_for")} ${users.join(", ")} ${t(pluralSuffix)}`;
  }
};
