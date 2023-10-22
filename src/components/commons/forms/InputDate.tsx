"use client";

import React, { useState } from "react";
import InputText, { InputTextProps } from "./InputText";

interface InputDateProps {
  dateType: "time" | "date";
}

const InputDate: React.FC<InputTextProps & InputDateProps> = ({
  dateType = "date",
  ...props
}) => {
  const [value, setValue] = useState("");
  const [type, setType] = useState("text");
  const switchInputTypeDate = () => {
    if (type === "text") {
      setType(dateType);
    }
  };
  const switchBackToText = (force = false) => {
    if (!value || force) setType("text");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <InputText
      {...{ type }}
      onFocus={switchInputTypeDate}
      onBlur={() => switchBackToText()}
      onChange={handleChange}
      maxLength={50}
      {...props}
    />
  );
};

export default InputDate;
