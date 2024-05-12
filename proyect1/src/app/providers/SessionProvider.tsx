"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

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

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User>({
    USR_Email: "",
    USR_Name: "",
    USR_FirstLastName: "",
    USR_SecondLastName: "",
    USR_Role: "",
    USR_Department: null,
  });

  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useSession = () => useContext(GlobalContext);
