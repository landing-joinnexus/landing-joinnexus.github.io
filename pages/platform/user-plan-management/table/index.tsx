import { PlatformTable, PlatformTableRow } from "components";
import { UserLicenseAssignment } from "models";
import { useTranslation } from "react-i18next";
import { ActionsColumn } from "./actions-column";
import { StatusColumn } from "./status-column";
import { UserColumn } from "./user-column";

interface Props {
  assignment?: Array<UserLicenseAssignment>;
  loadUsers?: () => void;
}

const titles = [
  "user_plan_management.user",
  "user_plan_management.status",
  "user_plan_management.actions",
];

export const Table = (props: Props) => {
  const { t } = useTranslation();
  if (!props.assignment) {
    return null;
  }

  const header = titles.map(title => t(title));
  const body: Array<PlatformTableRow> = props.assignment.map(user => ({
    id: String(user.toUser.id),
    columns: [
      {
        id: `user_${user.toUser.id}`,
        content: <UserColumn user={user.toUser} />,
      },
      {
        id: `status_${user.toUser.id}`,
        content: <StatusColumn assignment={user} />,
      },
      {
        id: `actions_${user.toUser.id}`,
        content: <ActionsColumn loadUsers={props.loadUsers} assignment={user} />,
      },
    ],
  }));

  return <PlatformTable header={header} body={body} />;
};
