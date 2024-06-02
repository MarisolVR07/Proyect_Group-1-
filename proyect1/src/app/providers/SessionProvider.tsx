"use client";
import React, { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import { scheduleJob } from "../utils/mailNotification";
interface User {
  USR_Email: string;
  USR_Name: string;
  USR_FirstLastName: string;
  USR_SecondLastName: string;
  USR_Role: string;
  USR_Department?: number | null;
}

interface ContextProps {
  userData: User;
  setUserData: Dispatch<SetStateAction<User>>;
}

const GlobalContext = createContext<ContextProps>({
  userData: {
    USR_Email: "",
    USR_Name: "",
    USR_FirstLastName: "",
    USR_SecondLastName: "",
    USR_Role: "",
    USR_Department: null,
  },
  setUserData: () => {},
});


type SessionProviderProps = {
  children: React.ReactNode;
};


export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [to, setTo] = useState('joksanmj.777@gmail.com');
  const [subject, setSubject] = useState('HOLA');
  const [text, setText] = useState('Hola');
  const [html, setHtml] = useState('<h1>Hola</h1>');
  const [message, setMessage] = useState('');

  

  const [userData, setUserData] = useState<User>({
    USR_Email: "",
    USR_Name: "",
    USR_FirstLastName: "",
    USR_SecondLastName: "",
    USR_Role: "",
    USR_Department: null,
  });

  useEffect(() => {

    scheduleJob()
  }, []);

  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para usar el contexto global
export const useSession = () => useContext(GlobalContext);