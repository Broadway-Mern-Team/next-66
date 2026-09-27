'use client'
import { useParams } from "next/navigation";
import SingleProductDetail from "./SingleProductDetail";

export default function CategoryProductListGrid() {
  const params = useParams()
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />

        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />

        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />

        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
        <SingleProductDetail />
      </div>
    </>
  );
}