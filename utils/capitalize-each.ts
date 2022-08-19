import { startCase, toLower } from "lodash";

export const capitalizeEach = (str?: string) => startCase(toLower(str));
