import TableData from "@/components/commons/tables/TableData";
import { User } from "@/interfaces/User";
import { userTableAdapter } from "@/interfaces/adapters/UserAdapter";
import userService from "@/services/tables/users";
import { ColumnsType } from "antd/es/table";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const roles = [1];

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
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const UserPage = async () => {
  const session = await getServerSession(authOptions);
  const rol = session?.role_code;
  if (rol && !roles.includes(rol)) {
    return redirect("/");
  }
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
