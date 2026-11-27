import { createContext } from "react";
import {AuthContextType} from "@/lib/types/AuthTypes"

const AuthContext = createContext<AuthContextType>({
  loggedInUser: null, 
  login: async (): Promise<void>=> {},
  getLoggedInUser: async(): Promise<void>=>{}
})

export default AuthContext