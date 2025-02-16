import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface props {
  main: string;
  setMain: Dispatch<SetStateAction<string>>;
}

const MainContext = createContext({} as props);

export default MainContext;
