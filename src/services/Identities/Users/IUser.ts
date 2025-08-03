import { IIdentity } from "../IIdentity";

export interface IUser extends IIdentity {
  security: {
    hashedPassword: string;
    saltedPassword: string;
    tokenSecrets: string;
  };
}
