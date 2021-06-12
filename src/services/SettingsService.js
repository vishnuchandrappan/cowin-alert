import React, { createContext, useState } from "react";

export const SettingsContext = createContext(null);

export const SettingsService = ({ children }) => {
  const [muted, setMuted] = useState(false);
  const [disablePreferences, setDisablePreferences] = useState(false);

  return (
    <SettingsContext.Provider
      value={{ muted, setMuted, disablePreferences, setDisablePreferences }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
