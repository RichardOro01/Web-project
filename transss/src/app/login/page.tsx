import Image from "next/image";
import React from "react";
import bus from "@/assets/bus.svg";
import user from "@/assets/icons/user.svg";
import lock from "@/assets/icons/lock.svg";
import styles from "@/styles/loging.module.css";
import Button from "@/components/commons/Button";

function Login() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-primary to-secondary">
      <div className="bg-white flex flex-col items-center rounded px-6 py-5 shadow h-max">
        <h1 className="font-semibold text-3xl">Transbus</h1>
        <h4 className="text-gray-500 text-lg font-semibold">Access control</h4>
        <section className="flex justify-center relative h-[150px] overflow-hidden w-64">
          <Image src={bus} alt="bus" width={148} className={styles.bus} />
          <span className={`${styles.street} ${styles["street-1"]}`}></span>
          <span className={`${styles.street} ${styles["street-2"]}`}></span>
          <span className={`${styles.street} ${styles["street-3"]}`}></span>
          <span className={`${styles.street} ${styles["street-4"]}`}></span>
          <span className={`${styles.street} ${styles["street-5"]}`}></span>
          <span className={`${styles.street} ${styles["street-6"]}`}></span>
          <span className={`${styles.street} ${styles["street-7"]}`}></span>
        </section>
        <form method="post" className="flex flex-col gap-2">
          <div className="flex gap-1">
            <Image src={user} alt="user" />
            <input
              className=" outline-none border-b border-solid border-b-gray-500 w-full"
              name="user"
              type="text"
              placeholder="user"
              maxLength={100}
              required
            />
          </div>
          <div className="flex gap-1">
            <Image src={lock} alt="user" />
            <input
              className=" outline-none border-b border-solid border-b-gray-500 w-full"
              name="password"
              type="password"
              placeholder="********"
              maxLength={100}
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </main>
  );
}

export default Login;
