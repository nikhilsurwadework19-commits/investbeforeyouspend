"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => { await signInWithEmailAndPassword(auth, email, password); };
  const signup = async (email: string, password: string) => { await createUserWithEmailAndPassword(auth, email, password); };
  const loginWithGoogle = async () => { await signInWithPopup(auth, new GoogleAuthProvider()); };
  const logout = async () => { await signOut(auth); };

  return <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
