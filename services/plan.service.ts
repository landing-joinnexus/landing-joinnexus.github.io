import { environment } from "environment";
import { get, patch, post } from "utils";

class PlanService {
  findUserLicenseAssignments() {
    return get(environment.plans.userLicenseAssignments);
  }

  createUserLicenseAssignment(email: string, name: string) {
    return post(environment.plans.userLicenseAssignment, {
      email: String(email).toLowerCase().trim(),
      name: String(name).trim(),
    });
  }

  updateActiveUserLicenseAssignment(userId: number, active: boolean) {
    return patch(environment.plans.userLicenseAssignment, {
      userId,
      active
    });
  }

}

export const planService = new PlanService();
