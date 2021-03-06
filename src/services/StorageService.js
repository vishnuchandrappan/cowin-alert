import { createContext } from "react";

export const StorageContext = createContext(null);

export const StorageService = ({ children }) => {
  const getItem = (item) => {
    const value = localStorage.getItem(item);
    return value ? JSON.parse(value) : null;
  };

  const setItem = (item, value) =>
    localStorage.setItem(item, JSON.stringify(value));

  return (
    <StorageContext.Provider value={{ getItem, setItem }}>
      {children}
    </StorageContext.Provider>
  );
};
