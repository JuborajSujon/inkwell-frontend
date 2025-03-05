export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  model: string;
  photo: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
