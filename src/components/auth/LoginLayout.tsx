'use client'

import Image from "next/image";
import React from "react";
import bus from "@/assets/bus.svg";
import styles from "@/styles/login.module.css";
import LoginForm from "@/components/auth/LoginForm";
import { useTranslation } from "react-i18next";

const LoginLayout = () => {
    const {t} = useTranslation(["translation"])
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-primary to-secondary">
      <div className="bg-white flex flex-col items-center rounded px-6 py-5 shadow h-max">
        <h1 className="font-semibold text-3xl">Transbus</h1>
        <h4 className="text-gray-500 text-lg font-semibold">{t("Access control",{ns:"translation"})}</h4>
        <section className="flex justify-center relative h-[150px] overflow-hidden w-64 mb-4">
          <Image src={bus} alt="bus" width={148} className={styles.bus} />
          <span className={`${styles.street} ${styles["street-1"]}`}></span>
          <span className={`${styles.street} ${styles["street-2"]}`}></span>
          <span className={`${styles.street} ${styles["street-3"]}`}></span>
          <span className={`${styles.street} ${styles["street-4"]}`}></span>
          <span className={`${styles.street} ${styles["street-5"]}`}></span>
          <span className={`${styles.street} ${styles["street-6"]}`}></span>
          <span className={`${styles.street} ${styles["street-7"]}`}></span>
        </section>
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginLayout
