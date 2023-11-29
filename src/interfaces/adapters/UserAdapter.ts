import { User, CreateUser, EditUser } from "../User";

export const userAdapter = (users: User[]): TableDataType<User>[] => {
  return users.map((user) => ({
    ...user,
    key: user.user_code,
    description: user.role?.description,
  }));
};

export const userFormAdapter = (
  user: TableDataType<User>
): FormDataType<EditUser> => ({
  user_code: user.user_code.toString(),
  username: user.username,
  password: user.password ?? "",
  name: user.name ?? "",
  role_code: user.role?.role_code.toString() ?? "",
});

export const userTypesAdapter = (user: FormDataType<EditUser>): EditUser => ({
  user_code: parseInt(user.user_code),
  username: user.username,
  password: user.password,
  name: user.name,
  role_code: parseInt(user.role_code ?? ""),
});

export const userCreateAdapter = (user: EditUser): CreateUser => ({
  username: user.username,
  password: user.password,
  name: user.name,
  role_code: user.role_code,
});