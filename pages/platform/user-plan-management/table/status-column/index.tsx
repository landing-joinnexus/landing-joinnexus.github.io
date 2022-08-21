import { UserLicenseAssignment } from "models";
import { useTranslation } from "react-i18next";

interface Props {
  assignment: UserLicenseAssignment;
}
export const StatusColumn = (props: Props) => {
  const { t } = useTranslation();
  const message = props.assignment.active
    ? t("user_plan_management.active")
    : t("user_plan_management.inactive");
  return <label>{message}</label>;
};
