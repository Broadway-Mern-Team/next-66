'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { SingleBannerData } from "@/lib/types/BannerTypes";
import { toast } from "sonner";
import { axiosClient } from "@/config/AxiosConfig";
import Link from "next/link";

export default function HomeHero() {
  const [banner, setBanner] = useState<Array<SingleBannerData>>([]);

  const getAllBanners = async () => {
    try {
      const {result} = await axiosClient.get("/banner/getForHome") as {result: Array<SingleBannerData>}
      setBanner(result)

    } catch (exception) {
      console.error({exception})
      toast.error("Error getting the banner list...")
    }
  }

  useEffect(() => {
    return () => {
      getAllBanners()
    }
  }, [])
  return (
    <>
      <section className="max-w-7xl mx-auto flex">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay
          modules={[Navigation, Autoplay]}
          navigation
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {banner &&
            banner.map((row: SingleBannerData, index: number) => (
              <SwiperSlide key={index}>
                <Link href={row.link} target="_banner">
                  <Image
                    src={row.image.url}
                    width={1200}
                    crossOrigin="anonymous"
                    height={400}
                    className="w-full"
                    alt="banner 1"
                  />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </>
  );
}
