export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IPrivateRoute extends IChildrenProps {
  role?: string;
}

export interface IResponse<T> {
  message: string;
  status: boolean;
  data: T;
}
