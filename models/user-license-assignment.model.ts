import { User } from "./user.model";

export interface UserLicenseAssignment {
  active: boolean;
  toUser: User;
}
