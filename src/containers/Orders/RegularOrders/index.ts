import { createOrder } from "./createOrder";
import { findOrderByID } from "./findOrderByID";
import { findOrderByTransactionID } from "./findOrderByTransactionID";

export const RegularOrders = {
  createOrder,
  findOrderByID,
  findOrderByTransactionID,
};
