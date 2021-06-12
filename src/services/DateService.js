import { createContext, useContext, useEffect, useState } from 'react'
import { DATES } from '../helpers/constants';
import { StorageContext } from './StorageService';

export const DateContext = createContext(null);

export const DateService = ({ children }) => {
  const { getItem, setItem } = useContext(StorageContext);
  const [dates, setDates] = useState(getItem(DATES) || []);

  const addToDates = (newDate) => {
    setDates([...dates, newDate].sort());
  }

  const removeFromDates = (newDate) => {
    setDates(dates.filter(date => date !== newDate));
  }

  const toggleDates = (newDate) => {
    if (dates.includes(newDate)) {
      removeFromDates(newDate);
    } else {
      addToDates(newDate);
    }
  }

  useEffect(() => {
    setItem(DATES, dates);
  }, [dates, setItem]);


  return (
    <DateContext.Provider value={{ dates, toggleDates }}>
      {children}
    </DateContext.Provider>
  )
}
