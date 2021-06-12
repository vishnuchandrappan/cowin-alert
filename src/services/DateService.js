import { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";
import { DATES } from "../helpers/constants";
import { StorageContext } from "./StorageService";

export const DateContext = createContext(null);

export const DateService = ({ children }) => {
  const today = moment().format("DD-MM-YYYY");

  const { getItem, setItem } = useContext(StorageContext);

  const getDate = () => {
    const data = getItem(DATES) || [];
    if (data[0] < today) {
      data.shift();
    }
    return data;
  };

  const [dates, setDates] = useState(getDate());

  const addToDates = (newDate) => {
    setDates([...dates, newDate].sort());
  };

  const removeFromDates = (newDate) => {
    setDates(dates.filter((date) => date !== newDate));
  };

  const toggleDates = (newDate) => {
    if (dates.includes(newDate)) {
      removeFromDates(newDate);
    } else {
      addToDates(newDate);
    }
  };

  useEffect(() => {
    setItem(DATES, dates);
  }, [dates, setItem]);

  return (
    <DateContext.Provider value={{ dates, toggleDates }}>
      {children}
    </DateContext.Provider>
  );
};
