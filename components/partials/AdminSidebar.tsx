'use client'

import Link from "next/link"
import {Icon} from "@iconify/react"
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";

export const AdminSidebar = () => {
  const {loggedInUser} = useAuth()


  const navMain = [
    {
      title: "Dashboard",
      url: `/${loggedInUser?.role}`,
      icon: <Icon icon={"fa7-solid:home"} />,
    },
    {
      title: "Banner Management",
      url: `/${loggedInUser?.role}/banner`,
      icon: <Icon icon={"fa7-solid:images"} />,
    },
    {
      title: "Category Management",
      url: `/${loggedInUser?.role}/category`,
      icon: <Icon icon={"fa7-solid:sitemap"} />,
    },
    {
      title: "User Management",
      url: `/${loggedInUser?.role}/users`,
      icon: <Icon icon={"fa7-solid:users"} />,
    },
    {
      title: "Product Management",
      url: `/${loggedInUser?.role}/product`,
      icon: <Icon icon={"fa7-solid:shopping-bag"} />,
    },
    {
      title: "Order Management",
      url: `/${loggedInUser?.role}/orders`,
      icon: <Icon icon={"fa7-solid:shopping-cart"} />,
    },
  ];


  return (
    <>
      {/* ----------------------- Sidebar -----------------------  */}
      <aside
        className={`hidden w-72 shrink-0 flex-col border-r border-white/5 bg-gray-900 text-gray-300 lg:flex`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
          <div className="size-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-500">
            {/* Logo */}
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
          <div>
            <p className=" px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Main
            </p>
          </div>
          <ul className="space-y-1">
            {navMain.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.url}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                            hover:bg-white/5 hover:text-white`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <p className=" px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Settings
            </p>
          </div>
          <ul className="space-y-1">
            <li>
              <Link 
              href={'/'}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                            hover:bg-white/5 hover:text-white`}
              >
                <Icon icon={"fa7-solid:power-off"} />
                Logout
              </Link>
            </li>
          </ul>

        </nav>

        {/* User Card */}
        <div className="border-t border-white-5 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="size-10 shrink-0 rounded-full bg-linear-to-br from-amber-400 to-rose-500">
              <Image
                src={loggedInUser?.image?.url as string}
                width={40}
                height={40}
                className="w-full rounded-full"
                alt="user"
                crossOrigin="anonymous"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {loggedInUser?.fullName}
              </p>
              <p className="truncate text-xs text-gray-400">
                {loggedInUser?.username}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
