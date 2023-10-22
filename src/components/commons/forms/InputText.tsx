"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/styles/inputs.module.css";

export interface InputTextProps {
  id: string;
  label: string;
  type?: string;
  max?: number;
  min?: number;
  maxLength?: number;
  currentValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  id,
  type,
  max,
  maxLength,
  min,
  currentValue,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
}) => {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const { current } = input;
    if (current && currentValue) {
      onChange && onChange({ target: current } as any);
    }
  }, [currentValue]);

  return (
    <div className={styles.text_group}>
      <input
        {...{
          id,
          type,
          max,
          min,
          maxLength,
          onChange,
          onKeyDown,
          onFocus,
          onBlur,
        }}
        ref={input}
        className={styles.form_input}
        placeholder=" "
        maxLength={20}
        value={currentValue}
      />
      <label htmlFor={id} className={styles.form_label}>
        {label}:
      </label>
      <span className={styles.form_line}></span>
    </div>
  );
};

export default InputText;
