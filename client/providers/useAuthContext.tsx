/* eslint-disable no-unused-vars */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useMeQuery } from "../generated/types";
import { jwtManager } from "../utils/jwtManager";

type AuthUser = {
  name: string;
  id: number;
  userId: string;
};

type AuthContextType = {
  id: number;
  userId: string;
  name: string;
  isAuthenticated: boolean;
  login: (token: string, { name, id, userId }: AuthUser) => void;
  logout: () => void;
};

type Props = {
  children: React.ReactNode;
};

const LoginUserContext = createContext<AuthContextType>({
  id: 0,
  userId: "",
  name: "",
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = (): AuthContextType =>
  React.useContext(LoginUserContext);

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { data } = useMeQuery();

  const login = (token: string, { name, id, userId }: AuthUser) => {
    jwtManager.setJwt(token);
    setIsAuthenticated(true);
    setId(id);
    setUserId(userId);
    setName(name);
    router.push("/");
  };

  const logout = () => {
    jwtManager.clear();
    setIsAuthenticated(false);
    setId(0);
    setUserId("");
    setName("");
    router.push("/login");
  };

  useEffect(() => {
    const hasToken = Boolean(jwtManager.getJwt());
    if (data?.me) {
      const { id, userId, name } = data?.me;
      setName(name);
      setId(id);
      setUserId(userId);
    }
    setIsAuthenticated(hasToken);
  }, [data?.me]);

  return (
    <LoginUserContext.Provider
      value={{ id, userId, name, login, logout, isAuthenticated }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};
