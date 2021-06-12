import { createContext, useState, useEffect, useContext } from "react";
import { SELECTED_DISTRICT, SELECTED_STATE } from "../helpers/constants";
import { StorageContext } from "./StorageService";

export const AppContext = createContext(null);

export const AppService = ({ children }) => {
  const alert = new Audio(
    "https://freesound.org/data/previews/426/426888_7913959-lq.mp3"
  );

  const { getItem, setItem } = useContext(StorageContext);

  const [selectedState, setSelectedState] = useState(getItem(SELECTED_STATE));
  const [selectedDistrict, setSelectedDistrict] = useState(
    getItem(SELECTED_DISTRICT)
  );

  useEffect(() => {
    setItem(SELECTED_STATE, selectedState);
  }, [selectedState, setItem]);

  useEffect(() => {
    setItem(SELECTED_DISTRICT, selectedDistrict);
  }, [selectedDistrict, setItem]);

  return (
    <AppContext.Provider
      value={{
        selectedDistrict,
        setSelectedDistrict,
        selectedState,
        setSelectedState,
        alert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
