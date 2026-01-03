"use client"
import React, { createContext, useContext, useState } from "react";

type openTodoContextType = {
  isTodoOpen: boolean;
  setIsTodoOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type IsTodoOpenContextPropsType = {
  children: React.ReactNode;
};

const openTodoContext = createContext<openTodoContextType | null>(null);

export const OpenTodoProvider = ({ children }: IsTodoOpenContextPropsType) => {
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  return (
    <openTodoContext.Provider value={{ isTodoOpen, setIsTodoOpen }}>
      {children}
    </openTodoContext.Provider>
  );
};

export const useOpenTodo = () => {
  const ctx = useContext(openTodoContext);
  if (!ctx) {
    throw new Error("useOpenTodo must be used inside OpenTodoProvider");
  }
  return ctx;
};
