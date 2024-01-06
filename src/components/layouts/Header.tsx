"use client";

import React, { useState } from "react";
import bus from "@/assets/bus.svg";
import Image from "next/image";
import { scrollToId } from "../core/scroll";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, MenuProps, Select, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import UserOptions from "../navbar/UserOptions";
import { useTranslation } from "react-i18next";
import useLanguageControl from "../../../i18n/hooks/useLanguageControl";
import UK from '@/assets/icons/items/uk.svg'
import Spain from '@/assets/icons/items/spain.svg'

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
          { key: "report", label: "Report"},
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
      {
        key: "reports",
        label: "Reports",
        children: [
          { key: "top_3_groups", label: "Top 3 groups activity" },
          { key: "top_5_drivers", label: "Top 5 drivers activity" },
          { key: "top_3_countries", label: "Top 3 countries" },
          { key: "free_cover", label: "Free cover drivers" },
          { key: "drivers_worked_group_tour", label: "Drivers worked group" },
          { key: "contracts_in_period", label: "Contracts in period" },
        ],
      },
      {
        key: "others",
        label: "Others",
        children: [
          { key: "districts", label: "District" },
          { key: "fuels", label: "Fuel" },
          { key: "countries", label: "Country" },
          { key: "months", label: "Month" },
          { key: "tourist_groups", label: "Tour group" },
          { key: "users", label: "Users" },
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
    key: "reports",
    label: "Reports",
  },
  {
    key: "others",
    label: "Others",
  },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [languajeTransBus,setLanguajeTransBus] = useState('')
  useLanguageControl(languajeTransBus,setLanguajeTransBus)

  const {t} = useTranslation(["translation"])
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
                  <Select
                    value={languajeTransBus}
                    style={{ width: 90 }}
                    onChange={e => setLanguajeTransBus(e)}
                  >
                  <Select.Option value="en">
                    EN <Image src={UK} alt="uk" width={22}/>
                  </Select.Option>

                  <Select.Option value="es">
                    ES <Image src={Spain} alt="spain" width={22} height={18}/>
                  </Select.Option>

                  </Select>
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
                    onClick={() => scrollToId("reports")}
                  >
                    {t("Reports")}
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
            <UserOptions/>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;