import { Option } from "@/components/commons/forms/InputSelect";
import { CreateRole, Role } from "../Role";

export const roleOptionsAdapter = (roles: Role[]): Option[] =>
  roles.map((role) => ({
    label: role.description,
    value: role.role_code.toString(),
  }));

export const roleAdapter = (roles: Role[]): TableDataType<Role>[] => {
  return roles.map((role) => ({
    ...role,
    key: role.role_code,
  }));
};

export const roleFormAdapter = (
  role: TableDataType<Role>
): FormDataType<Role> => ({
  role_code: role.role_code.toString(),
  description: role.description,
});

export const roleTypesAdapter = (role: FormDataType<Role>): Role => ({
  role_code: parseInt(role.role_code),
  description: role.description,
});

export const roleCreateAdapter = (role: Role): CreateRole => ({
  description: role.description,
});
