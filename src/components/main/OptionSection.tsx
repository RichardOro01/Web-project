import React from "react";

interface OptionSectionProps {
  name: string;
  children: React.ReactElement;
}

const OptionSection: React.FC<OptionSectionProps> = ({ name, children }) => {
  return (
    <section className="max-w-5xl w-full" id={name.toLowerCase()}>
      <h1 className="py-2 px-8 text-gray-500 rounded-xl mb-2 w-max shadow-xl text-2xl">
        {name}
      </h1>
      <div className="flex flex-wrap justify-start gap-12 p-8 shadow-xl rounded-xl">
        {children}
      </div>
    </section>
  );
};

export default OptionSection;
