import React, { createContext, useState } from 'react';

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const [noteArray , setNoteArray] = useState([]);

  return (
    <dataContext.Provider value={{ noteArray, setNoteArray }}>
      {children}
    </dataContext.Provider>
  );
};