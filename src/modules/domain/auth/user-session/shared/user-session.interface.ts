export interface IUserSession {
  userId: string;
  isDeleted: boolean;
  deleteAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
