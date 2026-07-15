export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
}

export type CreateUserInput = Omit<User, "id">;
export type UpdateUserInput = Partial<CreateUserInput>;
