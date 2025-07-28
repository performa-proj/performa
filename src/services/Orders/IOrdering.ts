import { IOrderline } from "./IOrderline";

export interface IOrdering {
  customer: {
    id: string;
    name: string;
    mobile: string;
    creditDays: number;
    creditLimit: number;
    creditSpent: number;
    creditAvailable: number;
  } | undefined;
  level: number;
  orderlines: IOrderline[];
}
