import { environment } from "environment";
import { get } from "utils";

class BillService {
  getBills() {
    return get(`${environment.bills.root}`);
  }
}

export const billService = new BillService();
