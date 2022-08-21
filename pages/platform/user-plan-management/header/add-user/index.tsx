import { PlatformButton, PlatformModal } from "components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserAdded } from "./user-added";
import { UserForm } from "./user-form";

interface Props {
  loadUsers?: () => void;
}

export const AddUser = (props: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [userAdded, setUserAdded] = useState('');
  let content = (
    <UserForm loadUsers={props.loadUsers} setIsOpen={setIsOpen} setUserAdded={setUserAdded} />
  );
  if (userAdded) {
    content = <UserAdded email={userAdded} setIsOpen={setIsOpen} setUserAdded={setUserAdded} />;
  }
  return (
    <>
      <PlatformButton onClick={() => setIsOpen(true)} label={t("user_plan_management.add_user")} />
      <PlatformModal isOpen={isOpen}>{content}</PlatformModal>
    </>
  );
};
