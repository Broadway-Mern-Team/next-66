'use client';

import { axiosClient } from "@/config/AxiosConfig";
import { IUserDetail } from "@/lib/types/AuthTypes";
import { IPaginationType } from "@/lib/types/GlobalTypes";
import Cookies from "js-cookie";
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {Icon} from "@iconify/react"
import Image from "next/image"
// import {DeleteButton} from "@/components/ui/button/DeleteButton"
import {buildHref, getPageWindow} from "@/lib/utilities/helpers"
import { useAuth } from "@/lib/hooks/useAuth";


export default function AllUserList() {
  const query = useSearchParams()
  const [data, setData] = useState<{
    result: Array<IUserDetail>;
    pagination: IPaginationType;
  }>();
  const [paginationData, setPagingationData]= useState<{hasPrev: boolean, hasNext:boolean, pageWindow:Array<number|null>}>({
    hasPrev: false, 
    hasNext: false, 
    pageWindow: [null]
  })

  const {loggedInUser} = useAuth()



  const getUserList = async(query: {search?: string, page: number, limit: number}= {search: "", page: 1, limit: 20}) => {
    try {
      const token = Cookies.get("token")
      const response = await axiosClient.get("/user", {
        headers: {
          Authorization: "Bearer "+token
        },
        params: {
          page: query.page, 
          limit: query.limit, 
          ...(query.search ? {search: query.search} : {})
        }
      }) as unknown as {result: Array<IUserDetail>, pagination: IPaginationType}
      setData(response)

    } catch(exception) {
      console.log(exception)
    }
  }

  useEffect(() => {
    return () => {
      setPagingationData({
        hasPrev: data?.pagination.page ? data?.pagination?.page > 1 : false,
        hasNext: data?.pagination.page && data.pagination.totalPages ? data?.pagination?.page < data?.pagination.totalPages : false,
        pageWindow: data?.pagination.page && data.pagination.totalPages ? getPageWindow(data?.pagination.page, data?.pagination.totalPages) : [null]
      })
    }
  },[data])



  useEffect(() => {
    return () => {
      getUserList({
        search: query.get("search") ? query.get('search') as string : "", 
        page: query.get("page") ? Number(query.get("page")) : 1, 
        limit: query.get("limit") ? Number(query.get('limit')) : 20
      })
    }
  }, [query])

  return (
    <>
      <div className="bg-gray-50 p-3 shadow rounded-md">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex-1 text-4xl font-semibold text-slate-800 text-shadow-lg">
            User Listing Page
          </h1>

          <div className="flex gap-3 flex-1 w-full shrink-0">
            <form
              action="/admin/users"
              method="get"
              className="w-full flex gap-2"
            >
              <div className="w-full">
                <input
                  type="search"
                  name="search"
                  defaultValue={query.get("search") as string}
                  className="border border-gray-50 bg-white shadow-2xl rounded-full p-2 px-5 w-full text-sm"
                  placeholder="Enter your search keyword"
                />
                <input type="hidden" name="page" value={1} />
                <input
                  type="hidden"
                  name="limit"
                  value={data?.pagination.limit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-3 shadow rounded-md flex w-full flex-col gap-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-black text-white p-2 border border-gray-800">
                Name
              </th>
              <th className="bg-black text-white p-2 border border-gray-800">
                Username
              </th>
              <th className="bg-black text-white p-2 border border-gray-800">
                Thumbnail
              </th>
              <th className="bg-black text-white p-2 border border-gray-800">
                Role
              </th>
              <th className="bg-black text-white p-2 border border-gray-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.result ? (
              data.result.map((row: IUserDetail, i: number) => (
                <tr key={i}>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    {row.fullName}
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    {row.username}
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <div className="w-full flex items-center justify-center">
                      <Image
                        src={row.image.url}
                        crossOrigin="anonymous"
                        width={40}
                        height={40}
                        className="w-7"
                        alt="users-img"
                      />
                    </div>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    {row.role}
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <div className="flex gap-3">
                      {/* <Link
                        href={"/admin/users/" + row._id}
                        className="size-10 bg-teal-800 text-white flex items-center justify-center rounded-full"
                      >
                        <Icon icon={"fa7-solid:pen"} />
                      </Link>
                      <DeleteButton endpoint={`/users/${row._id}`} /> */}
                      <Link href={"/"+loggedInUser?.role+"/chat/"+row._id} className="size-10 bg-blue-800 text-white flex items-center justify-center rounded-full">
                        <Icon icon={"fa7-solid:message"} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <p className="w-full rounded-full p-1 bg-gray-400 animate-pulse"></p>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="w-full flex items-center justify-end">
            <ul className="flex items-center justify-center gap-3">
              <li
                className={`bg-gray-200 size-6 flex items-center justify-center text-sm rounded-full shadow font-semibold hover:bg-slate-50
                ${paginationData.hasPrev ? "hover:bg-slate-50" : "opacity-40 pointer-events-none"}
              `}
              >
                <Link
                  href={buildHref("/admin/users", {
                    search: query.get("search") as string,
                    page: data.pagination.page - 1,
                    limit: data.pagination.limit,
                  })}
                >
                  <Icon icon={"fa7-solid:chevron-left"} />
                </Link>
              </li>

              {paginationData.pageWindow.map((p, idx) =>
                p === null ? (
                  <li key={idx}>...</li>
                ) : (
                  <li
                    key={idx}
                    className={`size-6 flex items-center justify-center text-sm rounded-full shadow font-semibold 
                      ${p === data.pagination.page ? "hover:bg-teal-700 text-white bg-teal-800" : "hover:bg-gray-200 bg-slate-50"}
                      `}
                  >
                    <Link
                      href={buildHref("/admin/users", {
                        search: query.get("search") as string,
                        page: p,
                        limit: data.pagination.limit,
                      })}
                    >
                      <span>{p}</span>
                    </Link>
                  </li>
                ),
              )}

              <li
                className={`bg-gray-200 size-6 flex items-center justify-center text-sm rounded-full shadow font-semibold  
                    ${paginationData.hasNext ? "hover:bg-slate-50" : "opacity-40 pointer-events-none"}
                  `}
              >
                <Link
                  href={buildHref("/admin/users", {
                    search: query.get("search") as string,
                    page: data.pagination.page + 1,
                    limit: data.pagination.limit,
                  })}
                >
                  <Icon icon={"fa7-solid:chevron-right"} />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}