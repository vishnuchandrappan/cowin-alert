import { createContext, useState } from 'react'

export const DateContext = createContext(null);

export const DateService = ({ children }) => {
  const [dates, setDates] = useState([]);

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
  return (
    <DateContext.Provider value={{ dates, toggleDates }}>
      {children}
    </DateContext.Provider>
  )
}
