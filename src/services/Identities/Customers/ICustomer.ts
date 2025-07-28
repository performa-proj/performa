import { IIdentity } from "../IIdentity";

export interface ICustomer extends IIdentity {
  cac: {
    level: number;
    creditDays: number;
    creditLimit: number;
    creditSpent: number;
  };
}
