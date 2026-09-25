'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";

export default function HomeHero() {
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
          <SwiperSlide>
            <Image
              src={
                "https://img.lazcdn.com/us/domino/3980db6a-68f4-45ba-b900-6939b2a9d9a6_NP-1976-688.jpg"
              }
              width={1200}
              height={400}
              className="w-full"
              alt="banner 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={
                "https://img.lazcdn.com/us/domino/149a722d-768f-4ab3-8523-470aaf94d027_NP-1976-688.jpg"
              }
              width={1200}
              height={400}
              className="w-full"
              alt="banner 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={
                "https://img.lazcdn.com/us/domino/d1bf45f5-d177-49c4-bdde-3138940b99bf_NP-1976-688.jpg"
              }
              width={1200}
              height={400}
              className="w-full"
              alt="banner 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={
                "https://img.lazcdn.com/us/domino/0e9a024e-e2b3-46c6-bd58-f09d4962053f_NP-1976-688.jpg"
              }
              width={1200}
              height={400}
              className="w-full"
              alt="banner 1"
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
