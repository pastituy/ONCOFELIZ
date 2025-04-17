import React, { createContext, useContext, useState } from "react";

// Creamos el contexto
const UserContext = createContext();

// Hook para usar el contexto más fácilmente
export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda los datos del usuario
  const [token, setToken] = useState(null); // Guarda el token si lo necesitas

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    // Opcional: guardar en localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
