import z from "zod"
import { ImageType } from "./AuthTypes";

export const BannerCreateSchema = z.object({
  title: z.string().min(3, "Title should be of at least 3 character long").max(100, "Title should not be more than 100 character"),
  link: z.url().nonempty("Link is requried"),
  status: z.string().regex(/^(active|inactive)$/, "Status can be either active or inactive").nonempty().nonoptional(),
  // status: z.enum(["active", "inactive"], "Status can be either active or inactive").nonoptional(),
  image: z.file().optional()
})

export type BannerFormData = z.infer<typeof BannerCreateSchema>

export type SingleBannerData = {
  title: string;
  status: string;
  link: string;
  image: ImageType
};