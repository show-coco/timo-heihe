import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useMeQuery } from "../generated/types";
import { jwtManager } from "../utils/jwtManager";

type AuthContextType = {
  id: string;
  name: string;
  isAuthenticated: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (token: string, { name, id }: { name: string; id: string }) => void;
  logout: () => void;
};

type Props = {
  children: React.ReactNode;
};

const LoginUserContext = createContext<AuthContextType>({
  id: "",
  name: "",
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = (): AuthContextType =>
  React.useContext(LoginUserContext);

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { data } = useMeQuery();

  const login = (token: string, { name, id }: { name: string; id: string }) => {
    jwtManager.setJwt(token);
    setIsAuthenticated(true);
    setId(id);
    setName(name);
    router.push("/");
  };

  const logout = () => {
    jwtManager.clear();
    setIsAuthenticated(false);
    setId("");
    setName("");
    router.push("/");
  };

  useEffect(() => {
    const hasToken = Boolean(jwtManager.getJwt());
    if (data?.me) {
      const { id, name } = data?.me;
      setName(name);
      setId(id);
    }
    setIsAuthenticated(hasToken);
  }, [data?.me]);

  return (
    <LoginUserContext.Provider
      value={{ id, name, login, logout, isAuthenticated }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};
