export interface IIdentity {
  _id: string;
  profile: {
    mobile: string;
    name: string;
    email?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
