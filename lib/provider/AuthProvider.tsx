'use client'

import { ReactNode, useEffect, useState } from "react";
import AuthContext from "@/lib/context/AuthContext";
import {GetUserDetailReponse, IUserDetail, LoginReponse} from "@/lib/types/AuthTypes"
import { LoginData } from "@/components/auth/LoginForm";
import { axiosClient } from "@/config/AxiosConfig";
import Cookies from "js-cookie";


export default function AuthProvider({children}: Readonly<{children: ReactNode}>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<null|IUserDetail>(null)

  const login = async(data: LoginData) => {
    try {
      const loginResponse = await axiosClient.post('/auth/login', data, {
        withCredentials: false
      }) as LoginReponse

      Cookies.set("token", loginResponse.result.token, {expires: 3/24, sameSite: "lax", secure: true})
      Cookies.set("refreshToken", loginResponse.result.refreshToken, {expires: 1, sameSite: "lax", secure: true})

      return await getLoggedInUser()
    } catch(exception) {
      throw exception
    }
  }

  const getLoggedInUser = async() => {
    setLoading(true);
    try {
      const userDetailReponse = (await axiosClient.get("/auth/dashboard", {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })) as GetUserDetailReponse;
      setLoggedInUser(userDetailReponse.result)
      return userDetailReponse.result
    } catch(exception) {
      throw exception
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = Cookies.get("token")
    return ()=> {
      if(token) {
        getLoggedInUser()
      } else {
        setLoading(false)
      }
    }
  }, [])

  return (
    // loading ? 
    // <>Loading...</> : 
    // <>
      <AuthContext.Provider
        value={{
          loggedInUser: loggedInUser,
          login: login,
          getLoggedInUser: getLoggedInUser
        }}
      >
        {children}
      </AuthContext.Provider>
    // </>
  )
}