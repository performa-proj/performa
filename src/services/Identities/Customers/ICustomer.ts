import { IIdentity } from "../IIdentity";

export interface ICustomer extends IIdentity {
  custac: {
    level: number;
    points: number;
    creditDays: number;
    creditLimit: number;
    creditSpent: number;
  };
}
