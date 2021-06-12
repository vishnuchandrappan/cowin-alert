import { createContext, useContext, useEffect, useState } from "react";
import { DISABLE_PREFERENCES, MUTED } from "../helpers/constants";
import { StorageContext } from "./StorageService";

export const SettingsContext = createContext(null);

export const SettingsService = ({ children }) => {
  const { getItem, setItem } = useContext(StorageContext);

  const [muted, setMuted] = useState(getItem(MUTED) || false);
  const [disablePreferences, setDisablePreferences] = useState(
    getItem(DISABLE_PREFERENCES) || false
  );

  useEffect(() => {
    setItem(MUTED, muted);
  }, [muted, setItem]);

  useEffect(() => {
    setItem(DISABLE_PREFERENCES, disablePreferences);
  }, [disablePreferences, setItem]);

  return (
    <SettingsContext.Provider
      value={{ muted, setMuted, disablePreferences, setDisablePreferences }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
