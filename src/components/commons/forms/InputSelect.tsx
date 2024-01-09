"use client";

import React, { useEffect, useRef, useState } from "react";
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
  currentValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
}

export const InputSelect: React.FC<InputSelectProps> = ({
  options,
  id,
  label,
  currentValue,
  onBlur,
  onChange,
  onFocus,
}) => {
  const [selectSelected, setSelectSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleValueChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const { value } = event.target;
    setSelectSelected(!!value);
    if (inputRef.current) inputRef.current.value = value;
    onChange &&
      onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
  };
  useEffect(() => {
    const { current } = inputRef;
    if (inputRef.current && currentValue) {
      inputRef.current.value = currentValue ?? "";
      onChange && onChange && onChange({ target: current } as any);
      setSelectSelected(!!currentValue);
    }
  }, [currentValue]);

  return (
    <div className={styles.select_group}>
      <input type="hidden" id="input" ref={inputRef} {...{ onChange }} />
      <select
        {...{ id, onFocus, onBlur }}
        className={`${styles.form_select} ${
          selectSelected && styles.select_selected
        }`}
        value={currentValue}
        onChange={handleValueChange}
      >
        <option value="" hidden></option>
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
