import { COLLECTION_NAME, Data } from "@/db";
import { IOrder } from "./IOrder";
import { IOrderline } from "./IOrderline";
import { Sessions } from "../Sessions";

export const createNew = async (props: {
  level: number;
  customer: {
    id: string;
    name: string;
    mobile: string;
    creditDays: number;
  } | undefined;
  orderlines: IOrderline[];
  weight: number;
  total: number;
}): Promise<IOrder> => {
  const {
    level,
    customer,
    orderlines,
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
    sessionID,
    transactionID,
    state: 1,
    level,
    ...(customer ? {
      customer: {
        id: customer.id,
        name: customer.name,
        mobile: customer.mobile,
      },
    } : {}),
    orderlines,
    weight,
    total,
    delivery: undefined,
    payment: {
      dueDate,
    },
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.Orders).insertOne(data);
  await Sessions.commitTransaction(sessionID);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
