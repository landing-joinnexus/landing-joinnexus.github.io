import { environment } from "environment";
import { get } from "utils";

class PaymentService {
  findAll() {
    return get(`${environment.payments.root}`);
  }
}

export const paymentService = new PaymentService();
