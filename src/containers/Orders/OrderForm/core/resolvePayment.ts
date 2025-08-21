import { IOrderline } from "@/services/Orders/IOrderline";

export const resolvePayment = (payloads: {
  total: number;
  payment: {
    cash: number;
    transfer: number;
    acc: number;
  };
}) => {
  const { total, payment } = payloads;
  const { cash, transfer, acc } = payment;

  let payable = 0;
  let change = 0;

  const paid = cash + transfer + acc;

  if (paid > total) {
    payable = 0;
    change = paid - total;
  } else {
    payable = total - paid;
    change = 0;
  }

  return {
    payable,
    change,
  };
};
