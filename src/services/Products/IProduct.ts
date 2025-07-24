import { IProductItem } from "./Items/IProductItem";

export interface IProduct {
  _id: string;
  ref: string;
  title: string;
  items: IProductItem[];
  createdAt: Date;
  updatedAt: Date;
}
