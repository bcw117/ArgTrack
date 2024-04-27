import { createContext } from "react";
import { Session } from "@supabase/supabase-js";

export const AuthContext = createContext<Session | undefined>(undefined);
