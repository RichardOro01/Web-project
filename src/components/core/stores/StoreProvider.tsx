"use client";

import React from "react";
import { store } from "@/components/core/stores/store";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: React.ReactElement;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider {...{ store }}>{children}</Provider>;
};

export default StoreProvider;
