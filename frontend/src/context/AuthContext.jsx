import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getMeApi, logoutApi } from "../api/user/authApi";
import { setUnauthorizedHandler } from "../api/authSession";
import { isLoggedInActions } from "../store/user/isLoginSlice";
import { userActions } from "../store/user/userSlice";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthenticatedUser = useCallback(
    (userData) => {
      setUser(userData);
      dispatch(isLoggedInActions.setLoginState());
      dispatch(userActions.storeUserInfo(userData));
    },
    [dispatch],
  );

  const clearAuth = useCallback(() => {
    setUser(null);
    dispatch(isLoggedInActions.removeLoginState());
    dispatch(userActions.clearUserInfo());
  }, [dispatch]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await getMeApi();
      if (response?.success && response.user) {
        setAuthenticatedUser(response.user);
        return true;
      }

      clearAuth();
      return false;
    } catch {
      clearAuth();
      return false;
    }
  }, [clearAuth, setAuthenticatedUser]);

  const login = useCallback(async () => {
    return checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // Cookie may already be invalid; still clear local auth state.
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      setIsLoading(true);
      try {
        await checkAuth();
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, [checkAuth]);

  useEffect(() => {
    setUnauthorizedHandler(clearAuth);
    return () => setUnauthorizedHandler(null);
  }, [clearAuth]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      checkAuth,
    }),
    [user, isLoading, login, logout, checkAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
