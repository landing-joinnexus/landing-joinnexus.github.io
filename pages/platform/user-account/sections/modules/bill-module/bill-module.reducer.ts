import { Bill, ReducerAction } from "models";

interface State {
  bills?: Array<Bill>;
  pendingPrice?: number;
  pendingBillIds?: Array<number>;
}

export const initialState: State = {};

export enum Actions {
  SET_BILLS = "SET_BILLS",
}

export const reducer = (state: State, action: ReducerAction) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.SET_BILLS:
      const pendingBills = (payload as Array<Bill>).filter(bill => !bill.createdAt);
      const pendingPrice = pendingBills.reduce((sum, bill) => bill.price + sum, 0);
      const pendingBillIds = pendingBills.map(bill => bill.id);

      return { ...state, bills: payload, pendingPrice, pendingBillIds };
    default:
      return state;
  }
};
