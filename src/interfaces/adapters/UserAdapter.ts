import { User, CreateUser, EditUser } from "../User";

export const userTableAdapter = (users: User[]): TableDataType<User>[] => {
  return users.map((user) => ({
    key: user.user_code,
    username: user.username,
    password: user.password || "",
    name: user.name || "",
    email: user.email || "",
    description: user.role?.description,
  }));
};

export const userFormAdapter = (user: User): FormDataType<EditUser> => ({
  user_code: user.user_code.toString(),
  username: user.username,
  password: user.password ?? "",
  name: user.name ?? "",
  email: user.email ?? "",
  role_code: user.role?.role_code.toString() ?? "",
});

export const userTypesAdapter = (user: FormDataType<EditUser>): EditUser => ({
  user_code: parseInt(user.user_code),
  username: user.username,
  password: user.password,
  name: user.name,
  email: user.email,
  role_code: parseInt(user.role_code ?? ""),
});

export const userCreateAdapter = (user: EditUser): CreateUser => ({
  username: user.username,
  password: user.password,
  name: user.name,
  email: user.email,
  role_code: user.role_code,
});
