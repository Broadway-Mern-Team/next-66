'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { InputComponent } from "../ui/form/InputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./auth.contract";
import { z } from "zod";
import { axiosClient } from "@/config/AxiosConfig";
import Cookies from "js-cookie"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { IUserDetail } from "@/lib/types/AuthTypes";
import { useEffect } from "react";


export type LoginData = z.infer<typeof LoginSchema>


export default function LoginForm() {
  const {control, handleSubmit} = useForm({
    defaultValues: {username: "", password: ""},
    resolver: zodResolver(LoginSchema)
  })
  const router = useRouter()
  const {login, loggedInUser} = useAuth()

  const loginSubmit = async (data: LoginData) => {
    try {
      const userDetail = await login(data) as IUserDetail
      toast.success("Welcome to admin Panel")
      router.push("/"+userDetail.role)

    } catch(exception) {
      console.log(exception)
      toast.error("Error logging In")
    }
  };

  useEffect(() => {
    if(loggedInUser) {
      router.push("/"+loggedInUser.role)
    }
  }, [loggedInUser])

  return (
    <>
      <form
        className="flex flex-col gap-5 py-5"
        onSubmit={handleSubmit(loginSubmit)}
      >
        <InputComponent htmlFor="username" labelTxt={"Username: "} name="username" control={control} />
        <InputComponent htmlFor="password" labelTxt={"Password: "} name="password" type="password"  control={control}/>

        <div className="flex items-center justify-between">
          <p className="text-sm">
            By logging into the application, you have agreen our{" "}
            <Link
              href={"/privacy-policy"}
              className="text-sm text-green-600 italic underline"
            >
              Privacy Policy{" "}
            </Link>{" "}
            &
            <Link
              href={"/terms-and-conditions"}
              className="text-sm text-green-600 italic underline"
            >
              Terms & Conditions
            </Link>
            .
          </p>
          <Link
            className="text-sm text-green-600 italic underline"
            href={"/forget-password"}
          >
            Forget Password
          </Link>
        </div>

        <div className="w-full flex gap-3">
          <button
            type="reset"
            className="bg-red-800 hover:bg-red-900 disabled:bg-red-900/50 disabled:cursor-not-allowed rounded-md cursor-pointer w-full text-white py-2 flex items-center justify-center "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-800 hover:bg-teal-900 disabled:bg-teal-900/50 disabled:cursor-not-allowed rounded-md cursor-pointer w-full text-white py-2 flex items-center justify-center "
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}