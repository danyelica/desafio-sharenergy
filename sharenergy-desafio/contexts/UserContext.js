import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "react-use";

const UserContext = createContext({});

export default UserContext;

export function UserProvider(props) {
  const user = useLocalStorage("user")[0];
  const headers = user && { Authorization: `Bearer ${user.token}` };

  return (
    <UserContext.Provider
      value={{
        user,
        headers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
