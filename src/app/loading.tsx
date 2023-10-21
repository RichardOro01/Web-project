import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-1 w-full h-full justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
