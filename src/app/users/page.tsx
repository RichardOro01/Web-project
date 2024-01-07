import TableData from "@/components/commons/tables/TableData";
import { User } from "@/interfaces/User";
import { userTableAdapter } from "@/interfaces/adapters/UserAdapter";
import userService from "@/services/tables/users";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<User> = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    dataIndex: "description",
    key: "description",
  },
];

const UserPage = async () => {
  let users: User[] = [];
  try {
    users = await userService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Users"
        modal="users"
        Data={users}
        dataToShow={userTableAdapter(users)}
        {...{ columns }}
      />
    </main>
  );
};

export default UserPage;
