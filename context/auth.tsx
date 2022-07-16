import { createContext, ReactNode, useContext } from "react";
import { useQuery, RefetchOptions, RefetchQueryFilters } from "react-query";
import { Loader } from "@mantine/core";
import { getLoggedInUser } from "../api";
import { QueryKeys, LoggedInUser } from "../types";

const authContext = createContext<{
  user: LoggedInUser;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(
    QueryKeys.loggedInUser,
    getLoggedInUser
  );
  return (
    <authContext.Provider value={{ user: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </authContext.Provider>
  );
}

const useAuth = () => useContext(authContext);

export { AuthContextProvider, useAuth };
