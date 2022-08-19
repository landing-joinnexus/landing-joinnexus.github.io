import { keys } from "lodash";
import { UserDetail } from "models";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Styles from './index.module.css';

export const renderOption =
  (goodOption: string, usersDetails: Record<string, UserDetail>, votes: Record<number, string>) =>
  (option: string) => {
    const { t } = useTranslation();
    const userIds = keys(usersDetails);
    const usersWithCurrentOption: Array<string> = [];

    for (const userId of userIds) {
      if (option.includes(votes[Number(userId)])) {
        usersWithCurrentOption.push(usersDetails[userId].name);
      }
    }

    const users = usersWithCurrentOption.join(", ");

    const classes = [];

    if (option.includes(goodOption)) {
      classes.push(Styles.answer);
    }

    return (
      <Fragment key={option}>
        <div className={classes.join(' ')}>{t(option)}</div>
        <div className={classes.join(' ')}>{users || "-"}</div>
      </Fragment>
    );
  };
