// src/hooks/useAuth.tsx - ROZSZERZONA WERSJA Z ROLAMI I DELEGACJĄ
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/utility";

export type UserRole = "student" | "teacher";

export type User = {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
  avatar_url?: string;
  xp?: number;
  level?: number;
  streak?: number;
  created_at?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  delegatedUser: User | null; // Dodane pole dla delegowanego użytkownika
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username?: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  setDelegatedUser: (user: User | null) => void; // Funkcja do ustawiania delegacji
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [delegatedUser, setDelegatedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    console.log("🔐 LOGIN WYWOŁANY:", { email });
    
    try {
      console.log("📤 WYSYŁAM ZAPYTANIE DO SUPABASE...");
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log("📥 ODPOWIEDŹ Z SUPABASE:", { 
        hasData: !!data, 
        hasError: !!error,
        errorMessage: error?.message 
      });
      
      if (error) {
        console.error("❌ BŁĄD LOGOWANIA:", error);
        throw error;
      }
      
      console.log("✅ LOGOWANIE UDANE");
      
    } catch (error) {
      console.error("💥 WYJĄTEK W LOGIN:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, username?: string, role: UserRole = "student") => {
    console.log("📝 REGISTER WYWOŁANY:", { email, username, role });
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            username: username || email.split('@')[0],
            role: role
          }
        }
      });
      
      if (error) throw error;
      
    } catch (error) {
      console.error("💥 BŁĄD REJESTRACJI:", error);
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setDelegatedUser(null); // Wyczyść też delegowanego użytkownika
  };

  useEffect(() => {
    console.log("🚀 USEAUTH INICJALIZACJA");
    
    // Sprawdź aktualną sesję
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("📋 AKTUALNA SESJA:", !!session);
      setLoading(false);
    });

    // Listener na zmiany
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔄 AUTH STATE CHANGE:", { event, hasSession: !!session });
        
        if (session?.user) {
          const userRole = (session.user.user_metadata?.role as UserRole) || "student";
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            username: session.user.user_metadata?.username,
            role: userRole
          });
        } else {
          setUser(null);
          setDelegatedUser(null); // Wyczyść delegację przy wylogowaniu
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  console.log("🔍 USEAUTH RENDER:", { hasUser: !!user, loading, hasDelegated: !!delegatedUser });

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      delegatedUser, 
      login, 
      register, 
      logout, 
      setDelegatedUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}