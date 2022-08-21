import { useSelector, shallowEqual, DefaultRootState } from "react-redux";

export const useShallowEqualSelector = <TState = DefaultRootState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
) => {
  return useSelector(selector, shallowEqual);
};
