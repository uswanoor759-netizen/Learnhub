
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { AuthContext } from "./authContextValue";

const API_URL = "http://localhost:5000/api/auth";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("learnhubUser")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("learnhubToken") || ""
  );

  const [authLoading, setAuthLoading] = useState(
    () => Boolean(localStorage.getItem("learnhubToken"))
  );

  useEffect(() => {
    const savedToken = localStorage.getItem("learnhubToken");

    if (!savedToken) return;

    let cancelled = false;

    axios
      .get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
      .then((response) => {
        if (cancelled) return;
        const currentUser = response.data.user;
        const normalizedUser = {
          ...currentUser,
          id: currentUser.id || currentUser._id,
          _id: currentUser._id || currentUser.id,
        };
        setUser(normalizedUser);
        localStorage.setItem("learnhubUser", JSON.stringify(normalizedUser));
      })
      .catch(() => {
        if (cancelled) return;
        setUser(null);
        setToken("");
        localStorage.removeItem("learnhubUser");
        localStorage.removeItem("learnhubToken");
      })
      .finally(() => {
        if (!cancelled) setAuthLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback((loginToken, loginUser) => {
    const normalizedUser = {
      ...loginUser,
      id: loginUser.id || loginUser._id,
      _id: loginUser._id || loginUser.id,
    };
    localStorage.setItem("learnhubToken", loginToken);
    localStorage.setItem("learnhubUser", JSON.stringify(normalizedUser));
    setToken(loginToken);
    setUser(normalizedUser);
    setAuthLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("learnhubToken");
    localStorage.removeItem("learnhubUser");
    setToken("");
    setUser(null);
    setAuthLoading(false);
  }, []);

  const value = {
    user,
    token,
    authLoading,
    isAuthenticated: Boolean(token && user),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
