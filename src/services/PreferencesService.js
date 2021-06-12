import { createContext, useContext, useEffect, useState } from "react";
import {
  COST,
  DOSE,
  FREE,
  MIN_AGE_LIMIT,
  REFRESH_TIME,
  VACCINE,
} from "../helpers/constants";
import { StorageContext } from "./StorageService";

export const PreferencesContext = createContext(null);

export const PreferencesService = ({ children }) => {
  const { getItem, setItem } = useContext(StorageContext);

  const [refreshTime, setRefreshTime] = useState(getItem(REFRESH_TIME) || 5);
  const [cost, setCost] = useState(getItem(COST) || FREE);
  const [minAgeLimit, setMinAgeLimit] = useState(getItem(MIN_AGE_LIMIT) || 45);
  const [dose, setDose] = useState(getItem(DOSE) || 1);
  const [vaccine, setVaccine] = useState(getItem(VACCINE) || "COVISHIELD");

  useEffect(() => {
    setItem(REFRESH_TIME, refreshTime);
  }, [refreshTime, setItem]);

  useEffect(() => {
    setItem(COST, cost);
  }, [cost, setItem]);

  useEffect(() => {
    setItem(MIN_AGE_LIMIT, minAgeLimit);
  }, [minAgeLimit, setItem]);

  useEffect(() => {
    setItem(DOSE, dose);
  }, [dose, setItem]);

  useEffect(() => {
    setItem(VACCINE, vaccine);
  }, [vaccine, setItem]);

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
        setVaccine,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
