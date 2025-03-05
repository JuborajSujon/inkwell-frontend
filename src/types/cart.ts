import { IProduct } from "./product";

// Define the Cart Item Interface
export interface ICartItem {
  _id: string;
  productId: IProduct;
  quantity: number;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Cart Interface
export interface ICart {
  _id: string;
  userEmail: string;
  items: ICartItem[];
  totalPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
