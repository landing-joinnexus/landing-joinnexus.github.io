import { keys } from "lodash";
import { QuestionOption, UserDetail } from "models";
import { Fragment } from "react";

export const renderOption =
  (
    currentLanguage: string,
    usersDetails: Record<string, UserDetail>,
    votes: Record<number, number>,
  ) =>
  (option: QuestionOption) => {
    const optionLanguage = option.optionLanguages.find(ol => ol.languageId === currentLanguage);
    const label = optionLanguage?.label;

    const userIds = keys(usersDetails);
    const usersWithCurrentOption: Array<string> = [];

    for (const userId of userIds) {
      if (votes[Number(userId)] === option.id) {
        usersWithCurrentOption.push(usersDetails[userId].name);
      }
    }

    const users = usersWithCurrentOption.join(", ");

    return (
      <Fragment key={option.id}>
        <div>{label}</div>
        <div>{users || "-"}</div>
      </Fragment>
    );
  };
