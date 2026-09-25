import HomeGridList from "@/components/category/HomeGridList";
import { HomeBelowCategory } from "@/components/cta/HomeCTA";
import HomeHero from "@/components/hero/HomeHero";
import ProductHomeGrid from "@/components/product/ProductHomeGrid";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-5">
        
        <HomeHero />
        
        <HomeGridList />
        
        <HomeBelowCategory />

        <ProductHomeGrid />
        
      </main>
    </>
  );
}
