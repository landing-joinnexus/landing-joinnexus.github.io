import { Plan } from "./plan.model";

export interface User {
  name: string;
  picture: string;
  accessToken: string;
  lastLoginAt: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  plan: Plan;
  email: string;
}
