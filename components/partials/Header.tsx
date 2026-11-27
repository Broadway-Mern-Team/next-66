'use client';
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

// client side component 
export default function Header() {
  const {loggedInUser} = useAuth()

  return (
    <>
      <header className="w-full flex justify-between px-10 py-3  shadow items-center">
        <Link href="/">
          <Image
            src={"/logo-1.jpeg"}
            className="w-15"
            height={80}
            width={80}
            alt="Logo"
          />
        </Link>
        <form className="flex w-xl items-center justify-end">
          <input
            type="search"
            className="w-full p-3 rounded-full  bordr border-gray-200 shadow-lg bg-blue-50"
            placeholder="Enter your search product name..."
          />
        </form>
        <div className="flex items-center justify-end">
          <nav>
            <ul className="flex gap-10">
              <li className="text-lg font-semibold text-teal-800 hover:underline tracking-tight leading-1">
                <Link href="/cart">View Cart</Link>
              </li>
              {loggedInUser ? (
                <>
                  <li className="text-lg font-semibold text-teal-800 hover:underline tracking-tight leading-1">
                    <Link href={`/${loggedInUser.role}`}>{loggedInUser?.fullName}</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-lg font-semibold text-teal-800 hover:underline tracking-tight leading-1">
                    <Link href="/register">Register</Link>
                  </li>
                  <li className="text-lg font-semibold text-teal-800 hover:underline tracking-tight leading-1">
                    <Link href="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}