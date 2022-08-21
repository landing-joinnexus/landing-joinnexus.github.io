import { UserLicenseAssignment } from "models";
import { useTranslation } from "react-i18next";
import { AddUser } from "./add-user";
import Styles from "./index.module.css";

class Props {
  users?: Array<UserLicenseAssignment> = [];
  loadUsers?: () => void;
}

export const Header = (props: Props) => {
  const { t } = useTranslation();
  let usersCount = null;
  if (props.users) {
    usersCount = (
      <>
        <label className={Styles.title}>{t("user_plan_management.active_users")}</label>
        <label className={Styles.subtitle}>{props.users.length}</label>
      </>
    );
  }
  return (
    <section className={Styles.container}>
      <div className={Styles.usersCount}>
        <div>{usersCount}</div>
      </div>
      <div className={Styles.addUserContainer}>
        <AddUser loadUsers={props.loadUsers} />
      </div>
    </section>
  );
};
