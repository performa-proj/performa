import { IOrderline } from "./IOrderline";

export interface IOrdering {
  level: number;
  orderlines: IOrderline[];
}
