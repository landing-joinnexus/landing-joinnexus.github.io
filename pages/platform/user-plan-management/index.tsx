import ChangeLanguageButton from "components/change-language-button";
import { GalacticWallpaper, GoToFeedButtonWrapper } from "hoc";
import { UserLicenseAssignment } from "models";
import { useEffect, useState } from "react";
import { planService } from "services";
import { Header } from "./header";
import { Table } from "./table";
import Styles from './index.module.css';

export const UserPlanManagement = () => {
  const [users, setUsers] = useState<Array<UserLicenseAssignment> | undefined>();
  const loadUsers = async () => {
    const response = await planService.findUserLicenseAssignments();
    setUsers(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <GalacticWallpaper>
      <GoToFeedButtonWrapper>
        <section className={Styles.container}>
          <Header users={users} loadUsers={loadUsers} />
          <Table assignment={users} loadUsers={loadUsers} />
        </section>
        <ChangeLanguageButton />
      </GoToFeedButtonWrapper>
    </GalacticWallpaper>
  );
};
