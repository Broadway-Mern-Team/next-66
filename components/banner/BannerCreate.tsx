'use client';
import { BannerFormData } from "@/lib/types/BannerTypes";
import BannerForm from "./BannerForm";
import { toast } from "sonner";
import { axiosClient } from "@/config/AxiosConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function BannerCreateForm() {
  const router = useRouter()

  const submitBannerCreate = async (data: BannerFormData) => {
    try {
      await axiosClient.post("/banner", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer "+Cookies.get("token")
        }
      })
      toast.success("Banner created successfully")
      router.push("/admin/banner")
    } catch(exception) {
      console.error({exception})
      toast.error("Error Creating Banner..", {
        description: "Error while creating banner, please try again later..."
      })
    }
  }
  return (<BannerForm formAction={submitBannerCreate} />)
}