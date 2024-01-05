import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";

const UserOptions = () => {
  const {t} = useTranslation(['translation'])

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
      label: t("Sign Out",{ns:'translation'}),
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
