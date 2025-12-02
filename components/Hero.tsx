"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string; // Placeholder for now
  logo?: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "PLAY & EARN",
    subtitle: "Explore > Play > Win",
    description: "Elevate your gaming experience",
    image: "/images/hero-soccer.jpg", // Placeholder path
    logo: "/assets/logos/ea-sports-fc26.png", // Placeholder path
  },
  {
    id: 2,
    title: "COMPETE & WIN",
    subtitle: "Challenge > Battle > Victory",
    description: "Join the ultimate esports platform",
    image: "/images/hero-gaming.jpg", // Placeholder path
  },
];

export default function Hero() {
  return (
    <section className="relative w-full pt-4 pb-8 md:pt-6 md:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Side - Large Carousel Banner */}
        <div className="lg:col-span-2">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#082C73] to-[#0a1128]">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-white/50",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-[#d4af37]",
              }}
              navigation={true}
              loop={true}
              className="h-full w-full"
            >
              {heroSlides.map((slide) => (
                <SwiperSlide key={slide.id} className="relative">
                  {/* Placeholder Background - Replace with actual image later */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#082C73]/90 to-[#0a1128]/90">
                    <div className="absolute inset-0 bg-[url('/images/hero-soccer.jpg')] bg-cover bg-center opacity-30"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-12 text-white">
                    {/* Top Section */}
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-sm md:text-base text-[#d4af37] font-medium mb-2">
                        {slide.subtitle}
                      </p>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-gray-200 mb-6">
                        {slide.description}
                      </p>
                      <button 
                        className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-8 py-3 rounded-lg font-semibold text-base hover:from-[#e5c047] hover:to-[#c9a429] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 w-fit focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label="Register for tournament"
                      >
                        Register Now
                      </button>
                    </div>

                    {/* Bottom Section - Logo */}
                    <div className="flex items-center gap-4">
                      {/* Placeholder for EA SPORTS FC26 logo */}
                      <div className="h-12 w-32 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <span className="text-xs text-white/70">EA SPORTS FC26</span>
                      </div>
                    </div>

                    {/* ESPORT Text at Bottom Center */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-white/20 tracking-wider">
                        ESPORT
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Side - Two Cards */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Top Card - Empower Your Community */}
          <div className="flex-1 relative h-[280px] md:h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#082C73] to-[#0a1128] p-6 flex flex-col items-center justify-center text-center">
            {/* Placeholder Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/20 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10">
              {/* Gold Star Icon Placeholder */}
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Empower Your Community
              </h3>
            </div>
          </div>

          {/* Bottom Card - Call of Duty */}
          <div className="flex-1 relative h-[280px] md:h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Placeholder Background - Replace with actual image later */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
              <div className="absolute inset-0 bg-[url('/assets/games/cod-mobile.jpg')] bg-cover bg-center opacity-40"></div>
            </div>

            <div className="relative h-full p-6 flex flex-col justify-end text-white">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Players Arcadia Esports Tournament
                </h3>
                <p className="text-sm text-gray-300">Call of Duty Mobile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

