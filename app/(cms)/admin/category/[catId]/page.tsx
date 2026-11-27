import CategoryUpdateForm from "@/components/category/CategoryUpdate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category Update || Admin Dashboard",

};
export default function EditCategoryPage() {

  return (
    <>
      <div className="bg-gray-50 p-3 shadow rounded-md">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex-1 text-4xl font-semibold text-slate-800 text-shadow-lg">
            Category Update Form
          </h1>
        </div>
      </div>

      <div className="bg-gray-50 p-3 shadow rounded-md">
        <div className="flex w-full justify-between items-center">
          <CategoryUpdateForm />
        </div>
      </div>
    </>
  );
}
