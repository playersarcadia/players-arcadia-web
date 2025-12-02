"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Tournament {
  id: number;
  title: string;
  platform: string;
  reward: string;
  date: {
    month: string;
    day: string;
  };
  image: string; // Placeholder path
}

const tournaments: Tournament[] = [
  {
    id: 1,
    title: "Call Of Duty - Destiny Tournament",
    platform: "Mobile",
    reward: "5K",
    date: {
      month: "JUN'22",
      day: "10",
    },
    image: "/assets/games/cod-mobile.jpg",
  },
  {
    id: 2,
    title: "FC 26 - Destiny Tournament",
    platform: "Console",
    reward: "5K",
    date: {
      month: "JUN'22",
      day: "15",
    },
    image: "/assets/games/fc26.jpg",
  },
  {
    id: 3,
    title: "Call Of Duty - Championship",
    platform: "Mobile",
    reward: "10K",
    date: {
      month: "JUL'22",
      day: "05",
    },
    image: "/assets/games/cod-mobile.jpg",
  },
  {
    id: 4,
    title: "FC 26 - League Tournament",
    platform: "Console",
    reward: "8K",
    date: {
      month: "JUL'22",
      day: "20",
    },
    image: "/assets/games/fc26.jpg",
  },
];

export default function UpcomingTournaments() {
  return (
    <section className="py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
          Upcoming Tournaments
        </h2>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            className="upcoming-tournaments-prev swiper-button-prev-custom w-10 h-10 rounded-full bg-[#082C73] text-white flex items-center justify-center hover:bg-[#0a3a8a] transition-colors"
            aria-label="Previous tournaments"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="upcoming-tournaments-next swiper-button-next-custom w-10 h-10 rounded-full bg-[#082C73] text-white flex items-center justify-center hover:bg-[#0a3a8a] transition-colors"
            aria-label="Next tournaments"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        navigation={{
          nextEl: ".upcoming-tournaments-next",
          prevEl: ".upcoming-tournaments-prev",
        }}
        className="!pb-12"
      >
        {tournaments.map((tournament) => (
          <SwiperSlide key={tournament.id}>
            <div className="bg-[#082C73] rounded-2xl overflow-hidden border-2 border-white shadow-lg hover:shadow-xl hover:border-[#d4af37] transition-all duration-300 transform hover:-translate-y-1">
              {/* Tournament Image */}
              <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Placeholder Background - Replace with actual image later */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/80">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50"
                    style={{
                      backgroundImage: `url(${tournament.image})`,
                    }}
                  ></div>
                </div>
                
                {/* Date Box */}
                <div className="absolute top-4 left-4 bg-[#082C73] rounded-lg p-3 text-white">
                  <div className="text-xs font-semibold mb-1">
                    {tournament.date.month}
                  </div>
                  <div className="text-2xl font-bold">{tournament.date.day}</div>
                </div>
              </div>

              {/* Tournament Details */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {tournament.title}
                </h3>
                <div className="flex flex-col gap-2 mb-6 text-gray-300">
                  <p className="text-sm md:text-base">
                    Platform - <span className="text-white font-semibold">{tournament.platform}</span>
                  </p>
                  <p className="text-sm md:text-base">
                    Reward - <span className="text-[#d4af37] font-semibold">{tournament.reward}</span>
                  </p>
                </div>
                <button 
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:from-[#e5c047] hover:to-[#c9a429] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#082C73]"
                  aria-label={`Register for ${tournament.title}`}
                >
                  Register Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

