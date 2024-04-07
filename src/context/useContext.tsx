import React, { createContext, useContext, useEffect, useState } from "react";
import * as Api from "../api/api";
import { Note } from "../types";

interface MyContextValue {
  count: number;
  increment: () => void;
  notes: Note[];
  isLoading: boolean;
}

const MyContext = createContext<MyContextValue | undefined>(undefined);

export const useMyContext = (): MyContextValue => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const results = await Api.getAllNotes();
      console.log("results");
      console.log(results);
      setNotes(results.data);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const contextValue: MyContextValue = {
    count,
    increment,
    notes,
    isLoading,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
