'use client'
import { CategoryCreateSchema, CategoryFormData, SingleCategoryData } from "@/lib/types/CategoryTypes";
import { useForm } from "react-hook-form";
import { FormLabel } from "../ui/form/Label";
import { FileUpload, Input, SelectOption } from "../ui/form/Input";
import { Button } from "../ui/button/Button";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";



export type CategoryFormPropsType = Readonly<{
  formAction: (data: CategoryFormData) => void;
  detail?: SingleCategoryData
}>
export default function CategoryForm({ formAction, detail }: CategoryFormPropsType) {
  const { control, handleSubmit, formState: {errors}, setValues } = useForm<CategoryFormData>({
    defaultValues: {title: "", showInHome: '0', status: "inactive"},
    resolver: zodResolver(CategoryCreateSchema)
  });

  useEffect(() => {
    setValues({
      title: detail?.title, 
      showInHome: `${detail?.showInHome}` as string, 
      status: detail?.status
    })
  }, [detail])

  return (
    <>
      <form
        onSubmit={handleSubmit(formAction)}
        className="flex flex-col gap-3 w-full"
      >
        <div className="flex w-full">
          <FormLabel>Title:</FormLabel>
          <div className="flex flex-col w-2/3">
            <Input
              name="title"
              control={control}
              errMsg={errors?.title?.message}
            />
          </div>
        </div>

        <div className="flex w-full">
          <FormLabel>Show In Home:</FormLabel>
          <div className="flex flex-col w-2/3">
            <SelectOption
              name="showInHome"
              control={control}
              errMsg={errors?.showInHome?.message}
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
            />
          </div>
        </div>

        <div className="flex w-full">
          <FormLabel>Status:</FormLabel>
          <div className="flex flex-col w-2/3">
            <SelectOption
              name="status"
              control={control}
              errMsg={errors?.status?.message}
              options={[
                { label: "Publish", value: "active" },
                { label: "Un-Publish", value: "inactive" },
              ]}
            />
          </div>
        </div>

        <div className="flex w-full">
          <FormLabel>Image:</FormLabel>
          <div className="flex flex-col w-2/3">
            <FileUpload
              name="image"
              control={control}
              errMsg={errors?.image?.message}
            />
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