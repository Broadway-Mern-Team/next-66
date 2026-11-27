'use client';

import { useForm } from "react-hook-form";
import { FileUploadComponent, FormSubmitButtonComponent, InputComponent, SelectOptionComponent } from "../ui/form/InputComponent";
import { RegisterData, RegistrationSchema } from "./auth.contract";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosClient } from "@/config/AxiosConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {useEffect} from "react"
import { useAuth } from "@/lib/hooks/useAuth";

// Validation 

export default function RegisterForm() {
  const { control, handleSubmit, formState: {isSubmitting, errors} } = useForm<RegisterData>({
    // defaultValues: {fullName: "", username: "", password: "", confirmPassword: "", role: "customer", phone: "", image: null,},
    resolver: zodResolver(RegistrationSchema)
  });

  const router = useRouter()
  const {loggedInUser} = useAuth()

  const userRegisterEvent = async (data: RegisterData) => {
    try {
      await axiosClient.post('/auth/register', data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      toast.success("Your account has been registered successfully.")
      router.push("/login")
    } catch(exception) {
      console.log({exception})
      toast.error("Sorry! There was a problem while registering your account.")
    }
  }

   useEffect(() => {
     if (loggedInUser) {
       router.push("/" + loggedInUser.role);
     }
   }, [loggedInUser]);

  return (
    <>
      <form onSubmit={handleSubmit(userRegisterEvent)} className="flex flex-col gap-5 py-5">
        <InputComponent errMsg={errors?.fullName?.message} htmlFor="fullName" labelTxt={"Full Name: "} name="fullName" control={control} />
        <InputComponent errMsg={errors?.username?.message} htmlFor="username" labelTxt={"Username (Email): "} name="username" type="email" control={control} />
        <InputComponent errMsg={errors?.password?.message} htmlFor="password" labelTxt={"Password: "} name="password" type="password" control={control} />
        <InputComponent errMsg={errors?.confirmPassword?.message} htmlFor="confirmPassword" labelTxt={"Re-Password: "} name="confirmPassword" type="password" control={control} />
        <InputComponent errMsg={errors?.phone?.message} htmlFor="phone" labelTxt={"Phone: "} name="phone" type="tel" control={control} />
        <SelectOptionComponent errMsg={errors?.role?.message} htmlFor="role" labelTxt={"Role: "} name="role" control={control} options={[   
          {label: "Buyer", value: "customer"},
          {label: "Seller", value: "seller"},
        ]} />
        <FileUploadComponent errMsg={errors?.image?.message} htmlFor="image" labelTxt={"Image: "} name="image" control={control} />
        <FormSubmitButtonComponent disabled={isSubmitting}/>
      </form>
    </>
  );
}