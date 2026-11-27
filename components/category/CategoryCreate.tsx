'use client';
import { CategoryFormData } from "@/lib/types/CategoryTypes";
import CategoryForm from "./CategoryForm";
import { toast } from "sonner";
import { axiosClient } from "@/config/AxiosConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CategoryCreateForm() {
  const router = useRouter()

  const submitCategoryCreate = async (data: CategoryFormData) => {
    try {
      await axiosClient.post("/category", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer "+Cookies.get("token")
        }
      })
      toast.success("Category created successfully")
      router.push("/admin/category")
    } catch(exception) {
      console.error({exception})
      toast.error("Error Creating Category..", {
        description: "Error while creating category, please try again later..."
      })
    }
  }
  return (<CategoryForm formAction={submitCategoryCreate} />)
}