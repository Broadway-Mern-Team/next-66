'use client';

import { axiosClient } from "@/config/AxiosConfig";
import {Icon} from "@iconify/react"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { BaseSyntheticEvent } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2"

export type DeleteButtonProps = {
  endpoint: string, 
}

export const DeleteButton = ({ endpoint }: Readonly<DeleteButtonProps>) => {
  const router = useRouter();

  const handleDelete = async (e: BaseSyntheticEvent) => {
    try {
      e.preventDefault();
      const {isConfirmed} = await Swal.fire({
        title: "Are you sure, You want to delete this?",
        text: "You won't be able to revert this step!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if(isConfirmed) {
        const token = Cookies.get("token")
        await axiosClient.delete(endpoint, {
          headers: {
            Authorization: "Bearer "+token
          }
        })
        toast.success("Data deleted successfully")
        router.refresh()                  // soft reload
        // window.location.reload()      // hard reloading
      }
    } catch {
      toast.error("Error deleting Data")
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="size-10 bg-red-800 text-white flex items-center justify-center rounded-full hover:cursor-pointer hover:scale-96 hover:bg-red-900 transition duration-300"
    >
      <Icon icon={"fa7-solid:trash"} />
    </button>
  );
};