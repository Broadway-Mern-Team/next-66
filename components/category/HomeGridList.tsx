import Image from "next/image";
import Link from "next/link";

export default function HomeGridList() {
  
  return (
    <>
      <section className="bg-gray-100 p-10 flex flex-col gap-5 w-7xl mx-auto">
        <div className="border-b border-b-gray-300 pb-5">
          <h2 className="text-3xl font-semibold underline underline-offset-2 text-teal-800">
            Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          <div className="w-full bg-white flex flex-col">
            <div>
              <Image
                src={
                  "https://img.drz.lazcdn.com/static/np/p/9b147f66b5a3234071bc283667dd5738.jpg"
                }
                width={200}
                height={100}
                className="w-50 h-25 object-contain"
                alt="category name"
                crossOrigin="anonymous"
              />
            </div>
            <div className="p-2">
              <Link
                href={"/category/smart-phones"}
                className="text-lg font-semibold text-teal-900 hover:underline"
              >
                Smart Phones
              </Link>
            </div>
          </div>
          <div className="w-full bg-white flex flex-col">
            <div>
              <Image
                src={
                  "https://img.drz.lazcdn.com/static/np/p/6c0fee63f2f1aa8e1476c81dc23ef628.png"
                }
                width={200}
                height={100}
                className="w-50 h-25 object-contain"
                alt="category name"
                crossOrigin="anonymous"
              />
            </div>
            <div className="p-2">
              <Link
                href={"/category/traps-and-drains"}
                className="text-lg font-semibold text-teal-900 hover:underline"
              >
                Traps and Drains
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}