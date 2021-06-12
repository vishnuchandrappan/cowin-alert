import React, { createContext, useState } from "react";
import { FREE } from "../helpers/constants";

export const PreferencesContext = createContext(null);

export const PreferencesService = ({ children }) => {
  const [refreshTime, setRefreshTime] = useState(5);
  const [cost, setCost] = useState(FREE);
  const [minAgeLimit, setMinAgeLimit] = useState(45);
  const [dose, setDose] = useState(1);
  const [vaccine, setVaccine] = useState('COVISHIELD');

  return (
    <PreferencesContext.Provider
      value={{
        refreshTime,
        setRefreshTime,
        cost,
        setCost,
        minAgeLimit,
        setMinAgeLimit,
        dose,
        setDose,
        vaccine,
        setVaccine
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
