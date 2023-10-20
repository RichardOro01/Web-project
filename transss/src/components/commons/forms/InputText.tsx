import React from "react";
import styles from "@/styles/inputs.module.css";

export interface InputTextProps {
  id: string;
  label: string;
  type?: string;
  max?: number;
  min?: number;
  maxLength?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  id,
  type,
  max,
  maxLength,
  min,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={styles.text_group}>
      <input
        {...{ id, type, max, min, maxLength, onChange, onKeyDown }}
        className={styles.form_input}
        placeholder=" "
        maxLength={20}
      />
      <label htmlFor={id} className={styles.form_label}>
        {label}:
      </label>
      <span className={styles.form_line}></span>
    </div>
  );
};

export default InputText;
