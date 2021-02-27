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

export type AuthContextType = {
  id: number;
  userId: string;
  name: string;
  avatar: string;
  isAuthenticated: boolean;
  skillIds: number[];
  loading: boolean;
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
  skillIds: [],
  loading: true,
  avatar: "",
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
  const [avatar, setAvatar] = useState("");
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const router = useRouter();
  const { data, error, loading } = useMeQuery();

  useEffect(() => {
    const token = jwtManager.getJwt();
    const hasToken = Boolean(token);

    console.log("token", token);
    console.log(data);

    if (data?.me) {
      const { id, userId, name, skills, avatar } = data?.me;
      const skillIds = skills?.map((skill) => skill.id);

      setName(name);
      setId(id);
      setUserId(userId);
      setAvatar(avatar || "");
      if (skillIds) {
        setSkillIds(skillIds);
      }
    }
    setIsAuthenticated(hasToken);
  }, [data, data?.me]);

  console.log(error);
  if (loading) return <p>Loading...</p>;

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

  return (
    <LoginUserContext.Provider
      value={{
        id,
        userId,
        name,
        avatar,
        skillIds,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};
