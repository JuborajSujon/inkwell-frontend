export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IAuthState {
  user: null | IUser;
  token: null | string;
}
