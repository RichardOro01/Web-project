import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { signOut } from "next-auth/react";

const UserOptions = () => {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      console.log("Error signing out");
    }
  };

  const menu: MenuProps["items"] = [
    {
      key: "signOut",
      label: "Sign Out",
      onClick: handleSignOut,
    },
  ];

  return (
    <Dropdown
      menu={{
        items: menu,
      }}
      className="cursor-pointer flex"
    >
      <UserOutlined className="text-white" />
    </Dropdown>
  );
};

export default UserOptions;
