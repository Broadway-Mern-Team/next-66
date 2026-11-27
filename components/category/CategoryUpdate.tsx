'use client';
import { CategoryFormData, SingleCategoryData } from "@/lib/types/CategoryTypes";
import CategoryForm from "./CategoryForm";
import { toast } from "sonner";
import { axiosClient } from "@/config/AxiosConfig";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryUpdateForm() {
  const router = useRouter()
  const [detail, setDetail]= useState<SingleCategoryData>();
  const [loading, setLoading] = useState<boolean>(true)

  const params = useParams()

  const submitCategoryUpdate = async (data: CategoryFormData) => {
    try {
      await axiosClient.put("/category/"+params.catId, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer "+Cookies.get("token")
        }
      })
      toast.success("Category updated successfully")
      router.push("/admin/category")
    } catch(exception) {
      console.error({exception})
      toast.error("Error Updating Category..", {
        description: "Error while updating category, please try again later..."
      })
    }
  }

  const getCategoryDetail = async () => {
    try {
      // console.log("/category/" + params.catId);
      const result = await axiosClient.get("/category/"+params.catId, {
        headers: {
          Authorization: "Bearer "+Cookies.get("token")
        }
      }) as {result: SingleCategoryData}
      setDetail(result.result)
    } catch {
      // console.log(exception)
      toast.error("Category not found")
      router.push("/admin/category")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      getCategoryDetail()
    }
  }, [params])

  return (
    loading ? "Loading..." : 
    <CategoryForm formAction={submitCategoryUpdate} detail={detail} />
  )
}