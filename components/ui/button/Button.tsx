import { ReactNode } from "react";

export type ButtonPropsType = Readonly<{
  type?: "reset" | "button" | "submit",
  className?: string,
  children: ReactNode,
  isDisabled?: boolean
}>
export const Button = ({type="button", className=``, children, isDisabled=false}: ButtonPropsType) => {

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
         ${
           type === "submit"
             ? "bg-teal-800 hover:bg-teal-900 disabled:bg-teal-900/50 text-white "
             : type === "reset"
               ? "bg-red-800 hover:bg-red-900 disabled:bg-red-900/50 text-white "
               : "bg-gray-50 hover:bg-gray-100 disabled:bg-gray-900/50 text-gray-900 "
         } disabled:cursor-not-allowed rounded-md cursor-pointer w-full py-2 flex gap-2 items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}