type Role = "user" | "admin";
type Status = "active" | "inactive";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  photo?: string | null;
  role: Role;
  status: Status;
  shippingAddress?: string;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  isBlocked?: boolean;
}
