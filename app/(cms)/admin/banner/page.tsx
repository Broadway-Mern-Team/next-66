import { axiosClient } from "@/config/AxiosConfig";
import { SingleBannerData } from "@/lib/types/BannerTypes";
import { IPaginationType } from "@/lib/types/GlobalTypes";
import { buildHref, getFirstItemOfAnArray, getPageWindow } from "@/lib/utilities/helpers";
import { Icon } from "@iconify/react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Banner Management || Admin Portal"
}


export const getAllBanners = async(query: {search?: string, page: number, limit: number}) => {
  const cookieData = (await cookies()).get("token");

  const data = (await axiosClient.get("/banner", {
    headers: {
      Authorization: "Bearer " + cookieData?.value,
    },
    params: {
      page: query.page, 
      limit: query.limit,
      ...(query.search ? {search: query.search}: {})
    }
  })) as unknown as {
    result: Array<SingleBannerData>;
    pagination: IPaginationType
  };
  return data
}


export default async function AdminBannerManagement({
  searchParams
}: {searchParams: Promise<{
  search?: string | string[], 
  page?: string | string[],
  limit?: string | string[]
}>}) {
  
  const sp = await searchParams

  const search = getFirstItemOfAnArray(sp.search) as string;
  const page = Number(getFirstItemOfAnArray(sp.page)) || 1
  const limit = Number(getFirstItemOfAnArray(sp.limit)) || 10;
  
  
  const data = await getAllBanners({page: page, limit: limit, search: search})

  const hasPrev = data.pagination.page > 1; 
  const hasNext = data.pagination.page < data.pagination.totalPages;

  const pageWindow = getPageWindow(data.pagination.page, data.pagination.totalPages)
  

  return (
    <>
      <div className="bg-gray-50 p-3 shadow rounded-md">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex-1 text-4xl font-semibold text-slate-800 text-shadow-lg">
            Banner Listing Page
          </h1>

          <div className="flex gap-3 flex-1 w-full shrink-0">
            <form
              action="/admin/banner"
              method="get"
              className="w-full flex gap-2"
            >
              <div className="w-full">
                <input
                  type="search"
                  name="search"
                  defaultValue={search}
                  className="border border-gray-50 bg-white shadow-2xl rounded-full p-2 px-5 w-full text-sm"
                  placeholder="Enter your search keyword"
                />
                <input type="hidden" name="page" value={1} />
                <input type="hidden" name="limit" value={data.pagination.limit} />
              </div>
              <div className="w-1/2">
                <Link
                  href={"/admin/banner/create"}
                  className="flex gap-3 px-5 p-2 items-center justify-center bg-teal-800 text-white rounded-full hover:underline hover:bg-teal-900 hover:font-semibold transition duration-300 hover:scale-103"
                >
                  <Icon icon={"fa7-solid:plus"} />
                  <span>Add Banner</span>
                </Link>
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
                Title
              </th>
              <th className="bg-black text-white p-2 border border-gray-800">
                Link
              </th>
              <th className="bg-black text-white p-2 border border-gray-800">
                Thumbnail
              </th>
              <th className="bg-black text-white p-2 border border-gray-800">
                Status
              </th>
              <th className="bg-black text-white p-2 border border-gray-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.result.length ? (
              data.result.map((row: SingleBannerData, i: number) => (
                <tr key={i}>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    {row.title}
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <a
                      href={row.link}
                      target="_banner"
                      className="text-blue-800 underline"
                    >
                      {row.link}
                    </a>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    <div className="w-full flex items-center justify-center">
                      <Image
                        src={row.image.url}
                        crossOrigin="anonymous"
                        width={100}
                        height={40}
                        className="w-25"
                        alt="banner-img"
                      />
                    </div>
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    {row.status === 'active' ? "Published" : "Un-Published"}
                  </td>
                  <td className="bg-white text-gray-800 p-3 border border-gray-300">
                    Edit / Delete
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

        {data.pagination.totalPages > 1 && (
          <div className="w-full flex items-center justify-end">
            <ul className="flex items-center justify-center gap-3">
              <li
                className={`bg-gray-200 size-6 flex items-center justify-center text-sm rounded-full shadow font-semibold hover:bg-slate-50
                ${hasPrev ? "hover:bg-slate-50" : "opacity-40 pointer-events-none"}
              `}
              >
                <Link
                  href={buildHref("/admin/banner", {
                    search: search,
                    page: data.pagination.page - 1,
                    limit: data.pagination.limit,
                  })}
                >
                  <Icon icon={"fa7-solid:chevron-left"} />
                </Link>
              </li>

              {pageWindow.map((p, idx) =>
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
                      href={buildHref("/admin/banner", {
                        search,
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
                    ${hasNext ? "hover:bg-slate-50" : "opacity-40 pointer-events-none"}
                  `}
              >
                <Link
                  href={buildHref("/admin/banner", {
                    search: search,
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