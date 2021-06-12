import React, { createContext, useState } from 'react'

export const SettingsContext = createContext(null);

export const SettingsService = ({ children }) => {
  const [muted, setMuted] = useState(false);

  return (
    <SettingsContext.Provider value={{ muted, setMuted }}>
      {children}
    </SettingsContext.Provider>
  )
}
