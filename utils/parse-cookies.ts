import { head, last, take, trim } from "lodash";

export const parseCookies = (str: string) =>
  (str || "")
    .split(";")
    .map(v => v.split("="))
    .reduce((acc: Record<string, string>, v: Array<string>) => {
      const key = trim(head(v));
      const keyDecoded = decodeURIComponent(key) as string;
      acc[keyDecoded] = decodeURIComponent(trim(last(take(v, 2))));
      return acc;
    }, {});
