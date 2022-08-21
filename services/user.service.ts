import { environment } from "environment";
import { User } from "models";
import { get, patch } from "utils";

export class UserService {
  findUserWithToken() {
    return get(`${environment.login.root}`);
  }

  updateUserInformation(changes: Partial<User>) {
    return patch(environment.users.root, changes);
  }
 
  findSubscription() {
    return get(environment.users.subscription);
  }
}

export const userService = new UserService();
