import { IUserDetail } from "@/lib/types/AuthTypes";
import Image from "next/image"

export default function ChatHeader({userDetail}: Readonly<{userDetail: IUserDetail}>) {
  return (
    <>
      <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
        <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-sky-400 to-indigo-500 text-sm font-semibold text-white">
          {userDetail && userDetail.image ? (
            <Image
              src={userDetail?.image?.url as string}
              width={40}
              height={40}
              className="w-full rounded-full"
              alt="user"
              crossOrigin="anonymous"
            />
          ) : (
            `${userDetail?.fullName
              .split(" ")
              .map((nameParts) => nameParts[0])
              .join("")
              .toUpperCase()}`
          )}
          <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-emerald-500" />
        </span>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-slate-900">
            {userDetail?.fullName}
          </h1>
          <p className="text-xs text-slate-500">{userDetail?.username}</p>
        </div>
      </header>
    </>
  );
}