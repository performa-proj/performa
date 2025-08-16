import { COLLECTION_NAME, Data } from "@/db";
import { Sessions } from "../../Sessions";
import { IOrderline } from "../IOrderline";
import { IProcessOrder } from "./IProcessOrder";

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
  ordering: {
    lines: IOrderline[];
    weight: number;
    total: number;
  };
  payment: {
    pod: boolean;
    payable: number;
  };
}): Promise<IProcessOrder> => {
  const {
    level,
    customer,
    ordering,
    payment,
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
    ordering,
    payment,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.ProcessOrders).insertOne(data);
  await Sessions.commitTransaction(sessionID);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
