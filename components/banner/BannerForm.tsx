'use client'
import { BannerCreateSchema, BannerFormData } from "@/lib/types/BannerTypes";
import { useForm } from "react-hook-form";
import { FormLabel } from "../ui/form/Label";
import { FileUpload, Input, SelectOption } from "../ui/form/Input";
import { Button } from "../ui/button/Button";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";



export type BannerFormPropsType = Readonly<{
  formAction: (data: BannerFormData) => void;
}>
export default function BannerForm({ formAction }: BannerFormPropsType) {
  const { control, handleSubmit, formState: {errors} } = useForm<BannerFormData>({
    defaultValues: {title: "", link: "",status: "inactive"},
    resolver: zodResolver(BannerCreateSchema)
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(formAction)}
        className="flex flex-col gap-3 w-full"
      >
        <div className="flex w-full">
          <FormLabel>Title:</FormLabel>
          <div className="flex flex-col w-2/3">
            <Input name="title" control={control} errMsg={errors?.title?.message} />
          </div>
        </div>

        <div className="flex w-full">
          <FormLabel>Link(url):</FormLabel>
          <div className="flex flex-col w-2/3">
            <Input type="url" name="link" control={control} errMsg={errors?.link?.message} />
          </div>
        </div>

        <div className="flex w-full">
          <FormLabel>Status:</FormLabel>
          <div className="flex flex-col w-2/3">
            <SelectOption name="status" control={control} errMsg={errors?.status?.message} 
            options={[
              {label: "Publish", value: "active"},
              {label: "Un-Publish", value: "inactive"},
            ]} />
          </div>
        </div>

        <div className="flex w-full">
          <FormLabel>Image:</FormLabel>
          <div className="flex flex-col w-2/3">
            <FileUpload name="image" control={control} errMsg={errors?.image?.message} />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div className="flex w-2/3 items-center justify-end gap-3">
            <Button type="reset">
              <Icon icon={"fa7-solid:undo"} />
              Cancel
            </Button>
            <Button type="submit">
              <Icon icon={"fa7-solid:paper-plane"} />
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}