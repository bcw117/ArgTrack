import { UserData } from "@/navigation";
import { createContext } from "react";

export const AuthContext = createContext<UserData | undefined>(undefined);
