import React, { createContext, useContext, useState, ReactNode } from "react";

// Define la forma del usuario (puedes extender esto con más campos)
interface UserData {
  id: string;
  nombre: string;
  email: string;
  // Agrega más campos si tu backend retorna más info
}

// Define la forma del contexto
interface UserContextType {
  userData: UserData | null;
  token: string | null;
  login: (userInfo: UserData, authToken: string) => void;
  logout: () => void;
}

// Valor inicial vacío (usamos `undefined` y luego controlamos en el hook)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personalizado
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};

// Props del proveedor
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (userInfo: UserData, authToken: string) => {
    setUserData(userInfo);
    setToken(authToken);
  };

  const logout = () => {
    setUserData(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ userData, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

