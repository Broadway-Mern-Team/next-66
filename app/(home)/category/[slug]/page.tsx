// server side component ;

import CategoryProductListGrid from "@/components/product/CategoryProductListGrid";

export default async function CategoryDetailPage({params}: Readonly<{params: Promise<{slug: string}>}>) {
  const slugParams = await params

  return (
    <>
      <section className="w-full max-w-7xl mx-auto p-10">
        <div className="w-full p-2">
          <h1 className="text-3xl font-semibold">
            Product list of <span className="text-teal-900 italic">{slugParams.slug}</span> Category
          </h1>
        </div>
        <CategoryProductListGrid />
      </section>
    </>
  );
}