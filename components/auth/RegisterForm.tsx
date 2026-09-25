'use client';

import { useForm } from "react-hook-form";
import { FileUploadComponent, FormSubmitButtonComponent, InputComponent, SelectOptionComponent } from "../ui/form/InputComponent";
import { RegisterData, RegistrationSchema } from "./auth.contract";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation 

export default function RegisterForm() {
  const { control, handleSubmit, formState: {isSubmitting, errors} } = useForm<RegisterData>({
    // defaultValues: {fullName: "", username: "", password: "", confirmPassword: "", role: "customer", phone: "", image: null,},
    resolver: zodResolver(RegistrationSchema)
  });

  const userRegisterEvent = (data: RegisterData) => {
    console.log(data);
  }

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