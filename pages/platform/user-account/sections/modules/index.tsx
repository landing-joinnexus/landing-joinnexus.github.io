// import BillModule from "./bill-module/bill-module";
// import PlanModule from "./plan-module/plan-module";
import UserInformationModule from "./user-information-module/user-information-module";

interface Module {
  label: string;
  component: JSX.Element;
}

export const modules: Array<Module> = [
  {
    label: "account.user_information",
    component: <UserInformationModule />,
  }/*,
  {
    label: "account.plan",
    component: <PlanModule />,
  },
  {
    label: 'account.bills',
    component: <BillModule />,
  }*/
];
