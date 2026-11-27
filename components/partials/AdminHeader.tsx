'use client'
import { useAuth } from "@/lib/hooks/useAuth";
import {Icon} from "@iconify/react"
import Image from "next/image"

export const AdminHeader = () => {
  const {loggedInUser} = useAuth()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6">
      <div className="relative w-full max-w-md">{/* Global Search */}</div>

      <div className="flex items-center gap-3">
        <div>
          <button
            type="button"
            className="relative flex size-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Icon icon={"fa7-solid:bell"} className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200"></div>

        <div
          className="flex items-center gap-3 rounded-gl p-1 pr-2 transition hover:bg-slate-100 justify-start"
        >
          <div className="size-9 rounded-full bg-linear-to-br from-amber-400 to-rose-500">
            <Image
              src={loggedInUser?.image?.url as string}
              width={40}
              height={40}
              className="w-full rounded-full"
              alt="user"
              crossOrigin="anonymous"
            />
          </div>

          <div className="flex flex-col">
            <span className="hidden text-sm font-medium sm:block">
              {loggedInUser?.fullName}
            </span>
            <span className="truncate text-xs text-gray-400">
              {loggedInUser?.username}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}