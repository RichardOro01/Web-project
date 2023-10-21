import Header from "@/components/layouts/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import "@/styles/global.css";
import StyledComponentsRegistry from "@/components/antd/AntdRegistry";
import StoreProvider from "@/components/core/stores/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transbus",
  description: "Transbus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans m-0`}>
        <StoreProvider>
          <ConfigProvider>
            <Header />
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ConfigProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
