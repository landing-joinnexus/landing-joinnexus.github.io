import { sanitizeLanguage } from "lang/i18";
import { keys } from "lodash";
import { QuestionOption, UserDetail } from "models";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Styles from './index.module.css';

export const renderOption =
  (usersDetails: Record<string, UserDetail>, votes: Record<number, string>) =>
  (option: QuestionOption) => {
    const { i18n } = useTranslation();

    const language = sanitizeLanguage(i18n.language);
    const optionLabel = option.optionLanguages.find(o => o.languageId === language)?.label;

    const userIds = keys(usersDetails);
    const usersWithCurrentOption: Array<string> = [];

    for (const userId of userIds) {
      const userVote = votes[Number(userId)];
      if (String(userVote) === String(option.id)) {
        usersWithCurrentOption.push(usersDetails[userId].name);
      }
    }

    const users = usersWithCurrentOption.join(", ");

    const classes = [];

    if (option.isPositive) {
      classes.push(Styles.answer);
    }

    return (
      <Fragment key={option.id}>
        <div className={classes.join(' ')}>{optionLabel}</div>
        <div className={classes.join(' ')}>{users || "-"}</div>
      </Fragment>
    );
  };
