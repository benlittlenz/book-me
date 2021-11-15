import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabaseClient';
import { Session, User, Provider } from '@supabase/supabase-js';

type UserContextType = {
  session: Session;
  user: User;
  userLoaded: boolean;
  signIn: (options: SignInOptions) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider;
    url?: string | null;
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (options: SignUpOptions) => Promise<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: Session | User | null;
  }>;
  signOut: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider = (props: any) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

    useEffect(() => {
      if (user) {
        setUserLoaded(true);
      }
    }, [user]);

  const value = {
    session,
    user,
    userLoaded,
    signIn: (options: SignInOptions) => supabase.auth.signIn(options),
    signUp: (options: SignUpOptions) => supabase.auth.signUp(options),
    signOut: () => {
      return supabase.auth.signOut();
    }
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  console.log("CONTEXT", context)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

type SignInOptions = {
  email?: string;
  password?: string;
  provider?: Provider;
};

type SignUpOptions = {
  email: string;
  password: string;
};
