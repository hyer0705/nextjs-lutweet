export interface IResponseData {
  ok: boolean;
  [key: string]: any;
}

export interface IResponseUserData extends IResponseData {
  user: {
    name: string;
    email: string;
  };
}
