import React from "react";
import styles from "@/styles/button.module.css";

interface ButtonProps {
  children: React.ReactElement | string;
  type?: "submit" | "reset" | "button";
}
const Button: React.FC<ButtonProps> = ({ children, type }) => {
  return (
    <button className={styles.button} {...{ type }}>
      {children}
    </button>
  );
};

export default Button;
