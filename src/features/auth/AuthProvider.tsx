import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAuthSession, logoutAdmin } from "./api";
import type { AuthSessionResponse, AuthState } from "./types";

type AuthContextValue = {
  authState: AuthState;
  refreshSession: () => Promise<AuthSessionResponse>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>({
    status: "loading",
    session: null,
  });

  async function refreshSession() {
    const session = await getAuthSession();

    if (session.authenticated) {
      setAuthState({
        status: "authenticated",
        session,
      });
    } else {
      setAuthState({
        status: "unauthenticated",
        session: null,
      });
    }

    return session;
  }

  async function logout() {
    await logoutAdmin();
    setAuthState({
      status: "unauthenticated",
      session: null,
    });
  }

  useEffect(() => {
    const controller = new AbortController();

    getAuthSession(controller.signal)
      .then((session) => {
        if (session.authenticated) {
          setAuthState({
            status: "authenticated",
            session,
          });
          return;
        }

        setAuthState({
          status: "unauthenticated",
          session: null,
        });
      })
      .catch(() => {
        setAuthState({
          status: "unauthenticated",
          session: null,
        });
      });

    return () => controller.abort();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      authState,
      refreshSession,
      logout,
    }),
    [authState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
