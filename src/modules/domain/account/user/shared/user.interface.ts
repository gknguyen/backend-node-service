export interface IUserInfo {
  userId: string;
  email: string;
  phone?: string;
}

export interface ICreateUserInfo extends IUserInfo {}
