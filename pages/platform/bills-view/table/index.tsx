import { PlatformTable, PlatformTableRow } from "components";
import { Bill } from "models";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { paymentService } from "services";
import { formatOnlyDate, formatPrice } from "utils";

const titles = [
  "billing.payment_date",
  "billing.accounts_amount",
  "billing.payment_method",
  "billing.amount",
  "billing.currency",
];

export const Table = () => {
  const [bills, setBills] = useState<Array<Bill>>([]);
  const { t } = useTranslation();
  useEffect(() => {
    (async () => {
      const response = await paymentService.findAll();
      setBills(response.data);
    })();
  }, []);
  const header = titles.map(title => t(title));
  const body: Array<PlatformTableRow> = bills.map(bill => ({
    id: String(bill.id),
    columns: [
      {
        id: `payment_date_${bill.id}`,
        content: formatOnlyDate(bill.createdAt),
      },
      {
        id: `accounts_amount_${bill.id}`,
        content: bill.accountsAmount,
      },
      {
        id: `payment_method_${bill.id}`,
        content: bill.paymentMethod,
      },
      {
        id: `amount_${bill.id}`,
        content: <label>{formatPrice(bill.price)}</label>,
      },
      {
        id: `currency_${bill.id}`,
        content: bill.currency,
      },
    ],
  }));
  return <PlatformTable header={header} body={body} />;
};
