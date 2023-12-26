"use client";

import React, { useEffect } from "react";
import bus from "@/assets/bus.svg";
import Image from "next/image";
import { scrollToId } from "../core/scroll";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, MenuProps, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import i18n from "@/app/i18n";
import { useTranslation } from "react-i18next";

const items: MenuProps["items"] = [
  {
    key: "tables",
    type: "group",
    label: "Tables",
    children: [
      {
        key: "management",
        label: "Management",
        children: [
          { key: "contracts", label: "Contract" },
          { key: "services", label: "Service" },
          { key: "discrepancy", label: "Discrepancy" },
          { key: "roadmap", label: "Roadmap" },
        ],
      },
      {
        key: "services",
        label: "Services",
        children: [
          { key: "brands", label: "Brands" },
          { key: "cars", label: "Cars" },
          { key: "drivers", label: "Drivers" },
          { key: "couples", label: "Couples" },
        ],
      },
    ],
  },
];

const scrollItems: MenuProps["items"] = [
  {
    key: "management",
    label: "Management",
  },
  {
    key: "services",
    label: "Services",
  },
  {
    key: "others",
    label: "Others",
  },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(()=>{
    i18n.changeLanguage("es")
  },[])

  const {t} = useTranslation(["es"])

  return (
    <>
      {pathname !== "/login" && (
        <header
          id="header"
          className="flex justify-between items-center py-2 px-4 shadow-2xl sticky top-0 bg-gradient-to-tr from-primary to-secondary z-10 text-white"
        >
          <div className="flex items-center gap-1">
            <Image src={bus} alt="bus" width={50} className="invert-[1]" />
            <div className="flex flex-col">
              <h3 className="text-xl">Transbus</h3>
              <h5 className="text-base text-blue-100">{t("An effective bus",{ns:"translation"})}</h5>
            </div>
          </div>

          <div className="flex gap-4">
            {pathname === "/" && (
              <>
                <nav className="sm:flex gap-2 hidden">
                  <span
                    className="cursor-pointer"
                    onClick={() => scrollToId("management")}
                  >
                    {t("Management",{ns:"translation"})}
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => scrollToId("services")}
                  >
                    {t("Services",{ns:"translation"})}
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => scrollToId("others")}
                  >
                    {t("Others",{ns:"translation"})}
                  </span>
                </nav>
                <Dropdown
                  menu={{
                    items: scrollItems,
                    onClick: (e) => scrollToId(e.key),
                  }}
                  className="cursor-pointer sm:hidden flex"
                >
                  <Space>
                    <MenuOutlined className="text-white" />
                  </Space>
                </Dropdown>
              </>
            )}
            {pathname !== "/" && pathname !== "/login" && (
              <Dropdown
                menu={{
                  items,
                  onClick: (e) => router.push(`/${e.key}`, { scroll: false }),
                }}
                className="cursor-pointer"
              >
                <Space>
                  <MenuOutlined className="text-white" />
                </Space>
              </Dropdown>
            )}
            <span>{t("User",{ns:"translation"})}</span>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
