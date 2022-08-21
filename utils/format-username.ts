import { split, take } from "lodash";

export const formatUsername = (username: string | undefined) =>
  take(split(username, " "), 2).join(" ");
