import TableData from "@/components/commons/tables/TableData";
import { Role } from "@/interfaces/Role";
import { roleAdapter } from "@/interfaces/adapters/RoleAdapter";
import roleService from "@/services/tables/roles";
import { ColumnsType } from "antd/es/table";
import React from "react";

const columns: ColumnsType<Role> = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

const RolePage = async () => {
  let roles: Role[] = [];
  try {
    roles = await roleService.get();
  } catch (error) {
    console.log(error);
  }
  return (
    <main className="flex flex-col gap-8 p-5">
      <TableData
        title="Roles"
        modal="roles"
        data={roleAdapter(roles)}
        {...{ columns }}
      />
    </main>
  );
};

export default RolePage;
