interface IErrorSource {
  message: string;
  path: string;
}

export interface IError {
  data: {
    errorSource: IErrorSource[];
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
}
