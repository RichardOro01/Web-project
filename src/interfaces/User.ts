import { Role } from "./Role";

export interface User {
  user_code: number;
  username: string;
  password: string | null;
  name: string | null;
  email: string | null;
  role?: Role;
}

export interface EditUser extends Omit<User, "role"> {
  role_code?: number;
}

export interface CreateUser extends Omit<EditUser, "user_code"> {}
