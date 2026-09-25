import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata:Metadata = {
  title: "Login Page || Ecommerce",
  description: ""
}

export default function LoginPage() {
  return (
    <>
      <section className="w-7xl mx-auto bg-white my-5">
        <div className="w-full p-5 bg-gray-50 shadow">
          <div className="border-b border-b-gray-200 pb-5">
            <h1 className="text-4xl text-teal-900 text-shadow-lg font-semibold">
              Login Form
            </h1>
          </div>

          <LoginForm />

          <div className="pb-5 w-full flex gap-3 items-center justify-between">
            <span className="w-full bg-gray-300 h-px"></span>
            <p className="text-xl font-bold text-center">OR</p>
            <span className="w-full bg-gray-300 h-px"></span>
          </div>

          <Link
            className="border border-teal-800 hover:bg-teal-50 rounded-full cursor-pointer w-full text-teal-900 py-2 flex items-center justify-center "
            href={"/register"}
          >
            {" "}
            Register from here
          </Link>
        </div>
      </section>
    </>
  );
}