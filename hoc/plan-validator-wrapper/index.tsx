import { ReactElement, ReactNode, useEffect, useState } from "react";
import { userService } from "services";
import { Loading } from "./loading";
import { NotActivePlan } from "./not-active-plan";

interface Props {
  children: ReactNode;
}

export const PlanValidatorWrapper = (props: Props) => {
  const [isActive, setIsActive] = useState<boolean | null>(null);

  useEffect(() => {
    const validateSubscription = async () => {
      const subscription = await userService.findSubscription();
      setIsActive(subscription.data?.active);
    }
    validateSubscription().then();
  }, [])

  if (isActive === null) {
    return <Loading />;
  }

  if (isActive) {
    return props.children as ReactElement;
  }

  return <NotActivePlan />;
};
