import { Select } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import useLanguageControl from "../../../i18n/hooks/useLanguageControl";
import UK from "@/assets/icons/items/uk.svg";
import Spain from "@/assets/icons/items/spain.svg";

const LanguageSwitcher: React.FC = () => {
  const [languageTransBus, setLanguageTransBus] = useState("");
  useLanguageControl(languageTransBus, setLanguageTransBus);

  const languages = [
    { value: "es", label: "ES", flag: Spain, alt: "Spain" },
    { value: "en", label: "EN", flag: UK, alt: "UK" },
  ];
  return (
    <Select
      value={languageTransBus}
      style={{ width: 90 }}
      onChange={(e) => setLanguageTransBus(e)}
    >
      {languages.map(({ value, flag, alt, label }) => (
        <Select.Option key={value} {...{ value }}>
          <div className="flex items-center gap-2">
            {label} <Image src={flag} {...{ alt }} width={22} />
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
