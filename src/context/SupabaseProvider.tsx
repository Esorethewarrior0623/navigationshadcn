import AsyncStorage from '@react-native-async-storage/async-storage'
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { SupabaseContext } from "./SupabaseContext";
import { SupabaseClient } from '@supabase/supabase-js';


const supabaseUrl = ""
const supabaseAnonKey = ""


// We are using Expo Secure Store to persist session info
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

type SupabaseProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNavigationReady, setNavigationReady] = useState(false);

    

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setLoggedIn(true);
  };

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  

  const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setLoggedIn(false);
  };

  const checkIfUserIsLoggedIn = async () => {
    const result = await supabase.auth.getSession();
    setLoggedIn(result.data.session !== null);
    setNavigationReady(true);
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const getGoogleOAuthUrl = async (): Promise<string | null> => {
       const result = await supabase.auth.signInWithOAuth({
         provider: "google",
         options: {
           redirectTo: "mysupabaseapp://google-auth",
         },
       });
       
       return result.data.url;
     };
    
     const setOAuthSession = async (tokens: {
       access_token: string;
       refresh_token: string;
     }) => {
       const { data, error } = await supabase.auth.setSession({
         access_token: tokens.access_token,
         refresh_token: tokens.refresh_token,
       });
    
       if (error) throw error;
    
       setLoggedIn(data.session !== null);
     };
    

  return (
    <SupabaseContext.Provider
      value={{ isLoggedIn, login, register, forgotPassword, logout, setOAuthSession,getGoogleOAuthUrl }}
    >
      {isNavigationReady ? props.children : null}
    </SupabaseContext.Provider>
  );
};
