import React, { useState } from "react";
import InputText, { InputTextProps } from "./InputText";

const InputDate: React.FC<InputTextProps> = (props) => {
  const [type, setType] = useState("text");
  function switchInputTypeDate() {
    if (type === "text") {
      setType("date");
    }
  }
  function switchBackToText(force = false) {
    //   if (!inputElement.value || force) {
    setType("text");
    //   }
  }

  return (
    <InputText
      {...{ type }}
      onFocus={switchInputTypeDate}
      onBlur={() => switchBackToText}
      maxLength={50}
      {...props}
    />
  );
};

export default InputDate;
