'use client'
import {useEffect, useState} from "react"
import { SingleCategoryData } from "@/lib/types/CategoryTypes";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { axiosClient } from "@/config/AxiosConfig";

export default function HomeGridList() {
  const [categories, setCategories] = useState<Array<SingleCategoryData>>([])
  const getForHome = async () => {
    try {
      const { result } = await axiosClient.get("/category/getForHome") as {result: Array<SingleCategoryData>}
      setCategories(result)
    } catch {
      toast.error("Error while fetching Categories")
    }
  }
  useEffect(() => {
    return () => {
      getForHome()
    }
  }, [])
  return (
    <>
      <section className="bg-gray-100 p-10 flex flex-col gap-5 w-7xl mx-auto">
        <div className="border-b border-b-gray-300 pb-5">
          <h2 className="text-3xl font-semibold underline underline-offset-2 text-teal-800">
            Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {categories &&
            categories.map((row: SingleCategoryData, index: number) => (
              <div className="w-full bg-white flex flex-col" key={index}>
                <div className="flex w-full items-center justify-center">
                  <Image
                    src={row.image.url}
                    width={200}
                    height={100}
                    className="w-35 h-25 object-contain"
                    alt="category name"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="p-2">
                  <Link
                    href={"/category/"+row.slug}
                    className="text-lg font-semibold text-teal-900 hover:underline"
                  >
                    {row.title}
                  </Link>
                </div>
              </div>
            ))}

        </div>
      </section>
    </>
  );
}