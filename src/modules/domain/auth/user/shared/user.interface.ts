export interface IAuthUser {
  userId: string;
  password?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IRegisterAuthUser {
  email: string;
  password: string;
}
