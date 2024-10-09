import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextType {
  isinvestor: boolean;
  setisinvestor: (isinvestor: boolean) => void;
  isrecruiter: boolean;
  setisrecruiter: (isrecruiter: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isinvestor, setisinvestor] = useState(false);
  const [isrecruiter, setisrecruiter] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ isinvestor, setisinvestor, isrecruiter, setisrecruiter }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
