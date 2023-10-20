import React from "react";
import InputText, { InputTextProps } from "./InputText";

const InputNum: React.FC<InputTextProps> = (props) => {
  const preventNotNumber: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (isNaN(parseInt(e.key)) && e.key !== "Backspace") e.preventDefault();
  };
  return <InputText {...props} onKeyDown={preventNotNumber} />;
};

export default InputNum;
