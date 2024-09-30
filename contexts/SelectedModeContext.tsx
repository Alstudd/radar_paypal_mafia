import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedModeContextType {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}

const SelectedModeContext = createContext<SelectedModeContextType | undefined>(undefined);

export const SelectedModeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMode, setSelectedMode] = useState("User");

  return (
    <SelectedModeContext.Provider value={{ selectedMode, setSelectedMode }}>
      {children}
    </SelectedModeContext.Provider>
  );
};

export const useSelectedMode = () => {
  const context = useContext(SelectedModeContext);
  if (!context) {
    throw new Error("useSelectedMode must be used within a SelectedModeProvider");
  }
  return context;
};
