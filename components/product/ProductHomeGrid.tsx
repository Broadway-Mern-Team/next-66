import SingleProductDetail from "./SingleProductDetail";

export default function ProductHomeGrid() {
  return (
    <>
      <section className="bg-gray-100 p-10 flex flex-col gap-5 w-7xl mx-auto">
        <div className="border-b border-b-gray-300 pb-5">
          <h2 className="text-3xl font-semibold underline underline-offset-2 text-teal-800">
            Picked for you
          </h2>
        </div>

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
      </section>
    </>
  );
}
