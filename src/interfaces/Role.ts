export interface Role {
  role_code: number;
  description: string;
}

export interface CreateRole extends Omit<Role, "role_code"> {}
