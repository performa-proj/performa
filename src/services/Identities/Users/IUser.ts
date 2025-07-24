import { IIdentity } from "../IIdentity";

export interface IUser extends IIdentity {
  hashedPassword: string;
  saltedPassword: string;
  tokenSecrets: string;
}
