import { IOrderline } from "./IOrderline";

export interface IOrdering {
  customer?: {
    id: string;
    name: string;
    mobile: string;
    points: number;
    creditDays: number;
    creditLimit: number;
    creditSpent: number;
  };
  level: number;
  orderlines: IOrderline[];
}
