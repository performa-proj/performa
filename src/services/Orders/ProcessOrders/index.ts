import { createNew } from "./createNew";
import { findByID } from "./findByID";
import { findByTransactionID } from "./findByTransactionID";
import { list } from "./list";
import { updateFulfill } from "./updateFulfill";

export const ProcessOrders = {
  createNew,
  findByID,
  findByTransactionID,
  list,
  updateFulfill,
};
