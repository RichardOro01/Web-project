"use client";

import React from "react";
import bus from "@/assets/bus.svg";
import Image from "next/image";
import { scrollToId } from "../core/scroll";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/login" && (
        <header
          id="header"
          className="flex justify-between items-center p-2 shadow-2xl sticky top-0 bg-gradient-to-tr from-primary to-secondary z-10 text-white"
        >
          <div className="flex items-center gap-1">
            <Image src={bus} alt="bus" width={50} className="invert-[1]" />
            <div className="flex flex-col">
              <h3 className="text-xl">Transbus</h3>
              <h5 className="text-base text-blue-100">An effective bus</h5>
            </div>
          </div>
          <div className="flex gap-4">
            <nav className="flex gap-2">
              <span
                className="cursor-pointer"
                onClick={() => scrollToId("management")}
              >
                Management
              </span>
              <span
                className="cursor-pointer"
                onClick={() => scrollToId("services")}
              >
                Services
              </span>
              <span
                className="cursor-pointer"
                onClick={() => scrollToId("others")}
              >
                Others
              </span>
            </nav>
            <span>User</span>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
