import axios from "axios";
import { createContext, useContext, useState } from "react";

export const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
    let token = localStorage.getItem("token");

    let getHistory = async () => {
    let meetingsData = await axios.post("http://localhost:8000/api/v1/user/get_all_activity",{token})
    return meetingsData;
  };

  return (
    <GeneralContext.Provider value={{getHistory}}>
      {children}
    </GeneralContext.Provider>
  );
};
