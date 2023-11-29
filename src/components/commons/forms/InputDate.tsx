"use client";

import React, { useEffect, useState } from "react";
import InputText, { InputTextProps } from "./InputText";
import dayjs from "dayjs";

interface InputDateProps {
  dateType: "time" | "date";
}

const InputDate: React.FC<InputTextProps & InputDateProps> = ({
  dateType = "date",
  onChange,
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
    console.log(value);
    if (!value || force) {
      setType("text");
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
    onChange && onChange(event);
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value) {
      switchInputTypeDate();
    }
  }, [value]);

  return (
    <InputText
      {...{ type }}
      {...props}
      onFocus={switchInputTypeDate}
      onBlur={() => switchBackToText()}
      onChange={handleChange}
      maxLength={50}
    />
  );
};

export default InputDate;
