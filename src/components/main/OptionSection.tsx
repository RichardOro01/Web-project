import React from "react";

interface OptionSectionProps {
  name: string;
  children: React.ReactElement;
}

const OptionSection: React.FC<OptionSectionProps> = ({ name, children }) => {
  return (
    <section
      className="max-w-5xl w-full flex flex-col items-center md:items-start"
      id={name.toLowerCase()}
    >
      <h1 className="py-2 px-8 text-gray-500 rounded-xl mb-2 w-max shadow-xl text-2xl">
        {name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-12 p-8 shadow-xl rounded-xl w-10/12">
        {children}
      </div>
    </section>
  );
};

export default OptionSection;
