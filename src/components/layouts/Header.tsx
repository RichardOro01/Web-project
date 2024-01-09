"use client";

import React from "react";
import bus from "@/assets/bus.svg";
import Image from "next/image";
import { scrollToId } from "../core/scroll";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import UserOptions from "../navbar/UserOptions";
import { useTranslation } from "react-i18next";
import useHeaderItems from "@/services/utils/useHeaderItems";
import { useSession } from "next-auth/react";
import LanguageSwitcher from "../navbar/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation(["translation"]);
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSession();

  const dataHeader = useHeaderItems();

  const pathsToHide = ["/login", "/api-doc"];

  return (
    <>
      {!pathsToHide.includes(pathname) && (
        <header
          id="header"
          className="flex justify-between items-center py-2 px-4 shadow-2xl sticky top-0 bg-gradient-to-tr from-primary to-secondary z-10 text-white"
        >
          <div className="flex items-center gap-1">
            <Image src={bus} alt="bus" width={50} className="invert-[1]" />
            <div className="flex flex-col">
              <h3 className="text-xl">Transbus</h3>
              <h5 className="text-base text-blue-100">
                {t("An effective bus", { ns: "translation" })}
              </h5>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {pathname === "/" && (
              <>
                <nav className="sm:flex items-center gap-2 hidden">
                  <LanguageSwitcher />
                  <span
                    className="cursor-pointer"
                    onClick={() => scrollToId(t("Management", { ns:"translation"}).toLowerCase())}
                  >
                    {t("Management", { ns: "translation" })}
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => scrollToId(t("Services", { ns:"translation"}).toLowerCase())}
                  >
                    {t("Services", { ns: "translation" })}
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => scrollToId(t("Reports",{ns:"translation"}).toLowerCase())}
                  >
                    {t("Reports",{ns:"translation"})}
                  </span>
                  {data?.role_code == 1 && (
                    <span
                      className="cursor-pointer"
                      onClick={() => scrollToId(t("Others", { ns: "translation" }).toLowerCase())}
                    >
                      {t("Others", { ns: "translation" })}
                    </span>
                  )}
                </nav>
                <Dropdown
                  menu={{
                    items: dataHeader.scrollItems,
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
                  items: dataHeader.items,
                  onClick: (e) => router.push(`/${e.key}`, { scroll: false }),
                }}
                className="cursor-pointer"
              >
                <Space>
                  <MenuOutlined className="text-white" />
                </Space>
              </Dropdown>
            )}
            <UserOptions />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
