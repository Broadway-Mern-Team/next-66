import z from "zod"
import { ImageType } from "./AuthTypes";

export const CategoryCreateSchema = z.object({
  title: z.string().min(3, "Title should be of at least 3 character long").max(100, "Title should not be more than 100 character"),
  status: z.string().regex(/^(active|inactive)$/, "Status can be either active or inactive").nonempty().nonoptional(),
  // status: z.enum(["active", "inactive"], "Status can be either active or inactive").nonoptional(),
  // showInHome: z.boolean().nonoptional(),
  showInHome: z.string().nonoptional(),
  image: z.file().optional()
})

export type CategoryFormData = z.infer<typeof CategoryCreateSchema>

export type SingleCategoryData = {
  _id: string,
  title: string;
  status: string;
  slug: string;
  showInHome: boolean;
  image: ImageType
};