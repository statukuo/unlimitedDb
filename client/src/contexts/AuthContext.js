import React, { useMemo } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axios";

// init context
const AuthContext = createContext();

// export the consumer
export function useAuth() {
  return useContext(AuthContext);
}

// export the provider (handle all the logic here)
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const register = (formData = {}) =>
    new Promise((resolve, reject) => {
      axios
        .post("/auth/register", formData)
        .then(({ data: { data: accountData, token: accessToken } }) => {
          setAccount(accountData);
          setToken(accessToken);
          setIsLoggedIn(true);
          resolve(true);
        })
        .catch((error) => {
          console.error(error);
          reject(error?.response?.data?.message || error.message);
        });
    });

  const login = (formData = {}) => {
    if (isLoggedIn) {
      return {
        isLoggedIn,
        account,
        token,
        register,
        login,
        logout,
      };
    }

    return new Promise((resolve, reject) => {
      axios
        .post("/auth/login", formData)
        .then(({ data: { data: accountData, token: accessToken } }) => {
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

          setAccount(accountData);
          setToken(accessToken);
          setIsLoggedIn(true);
          resolve(true);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          console.error(error);
          reject(error?.response?.data?.message || error.message);
        });
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccount(null);
    setToken(null);
  };

  const loginWithToken = async () => {
    try {
      const {
        data: { data: accountData, token: accessToken },
      } = await axios.get("/auth/login", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setAccount(accountData);
      setToken(accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
      if (error?.response?.statusCode === 401) {
        setToken(null);
      }
    }
  };

  // This side effect keeps local storage updated with recent token value,
  // making sure it can be re-used upon refresh or re-open browser
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    loginWithToken();
  }, []);


  // This side effect runs only if we have a token, but no account or logged-in boolean.
  // This "if" statement is "true" only when refreshed, or re-opened the browser,
  // if true, it will then ask the backend for the account information (and will get them if the token hasn't expired)
  useEffect(() => {
    if (!isLoggedIn && !account && token) loginWithToken();
  }, [isLoggedIn, account, token]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      account,
      token,
      register,
      login,
      logout,
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
