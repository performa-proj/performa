export interface IPriceStructure {
  _id: string;
  title: string;
  cost: number;
  levels: number[];
  createdAt: Date;
  updatedAt: Date;
}
