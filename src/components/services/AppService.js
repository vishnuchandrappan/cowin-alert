import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppService = ({ children }) => {
  const alert = new Audio('https://freesound.org/data/previews/426/426888_7913959-lq.mp3');

  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selectedDistrict,
        setSelectedDistrict,
        selectedState,
        setSelectedState,
        alert
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
