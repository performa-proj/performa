import { COLLECTION_NAME, Data } from "@/db";
import { IPlacedOrder } from "./IPlacedOrder";
import { IOrderline } from "./IOrderline";
import { Sessions } from "../Sessions";

export const createNew = async (props: {
  level: number;
  customer: {
    id: string;
    name: string;
    mobile: string;
    creditDays: number;
    creditLimit: number;
    creditSpent: number;
  } | undefined;
  orderlines: IOrderline[];
  pod: boolean;
  weight: number;
  total: number;
}): Promise<IPlacedOrder> => {
  const {
    level,
    customer,
    orderlines,
    pod,
    weight,
    total,
  } = props;

  const db = await Data.connectDB();
  const now = new Date();
  const {
    sessionID,
    transactionID,
  } = await Sessions.resolveTransactionID(now);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = customer ? new Date(today.getTime() + (customer.creditDays * 86400000)) : today;
  const dueDate = Number(`${due.getFullYear()}${(due.getMonth() + 1).toString().padStart(2, "0")}${due.getDate().toString().padStart(2, "0")}`)

  const data = {
    transactionID,
    level,
    customer: customer ? {
      id: customer.id,
      name: customer.name,
      mobile: customer.mobile,
    } : undefined,
    orderlines,
    pod,
    weight,
    total,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.PlacedOrders).insertOne(data);
  await Sessions.commitTransaction(sessionID);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
