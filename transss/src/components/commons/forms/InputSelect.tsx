import React, { useState } from "react";
import arrow from "@/assets/icons/chevron-down.svg";
import Image from "next/image";
import styles from "@/styles/inputs.module.css";

export interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  id: string;
  options: Option[];
  label: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({
  options,
  id,
  label,
}) => {
  const [selectSelected, setSelectSelected] = useState(false);
  return (
    <div className={styles.select_group}>
      <select
        {...{ id }}
        className={`${styles.form_select} ${
          selectSelected && styles.select_selected
        }`}
        onChange={() => setSelectSelected(true)}
      >
        <option value="null" selected hidden></option>
        {options.map(({ value, label }) => (
          <option key={value} {...{ value }}>
            {label}
          </option>
        ))}
      </select>
      <label htmlFor={id} className={styles.form_label_select}>
        {label}:
      </label>
      <span className={styles.form_line}></span>
      <div className={styles.form_static_line}></div>
      <Image src={arrow} alt="chevron-down" className={styles.arrow_select} />
    </div>
  );
};
