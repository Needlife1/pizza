'use client';

import { IStory } from '@/shared/services/stories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Props {
  stories: IStory[];
  onStoryClick: (story: IStory) => void;
}

export const Slider: React.FC<Props> = ({ stories, onStoryClick }) => {
  const isEmpty = stories.length === 0;
  const skeletonCount = 7;

  return (
    <div className="flex flex-col items-center w-full">
      <Swiper
        modules={[Pagination, EffectCoverflow]}
        className="w-full"
        loop={true}
        spaceBetween={16}
        centeredSlides={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2,
          slideShadows: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
            centeredSlides: false,
            effect: undefined,
          },
          1024: {
            slidesPerView: 5,
            centeredSlides: false,
            effect: undefined,
          },
        }}
        pagination={{ el: '.my-pagination', clickable: true }}
      >
        {isEmpty
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <SwiperSlide key={`sk-${index}`} className="!w-auto">
                <div
                  className="
                    rounded-xl bg-white shadow-sm p-2 mx-auto
                    w-[140px] h-[180px]
                    sm:w-[170px] sm:h-[220px]
                    md:w-[190px] md:h-[245px]
                    lg:w-[240px] lg:h-[310px]
                  "
                >
                  <div
                    className="
                      relative w-full h-full overflow-hidden rounded-lg
                      bg-gray-200 animate-pulse
                    "
                    aria-hidden="true"
                  />
                </div>
              </SwiperSlide>
            ))
          : stories.map((story) => (
              <SwiperSlide
                key={story.id}
                className="!w-auto transition-transform"
              >
                <div
                  className="
                rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow p-2
                w-[140px] h-[180px] sm:w-[170px] sm:h-[220px]
                md:w-[190px] md:h-[245px] lg:w-[240px] lg:h-[310px] mx-auto
              "
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={story.previewImageUrl}
                      alt="story"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onClick={() => onStoryClick(story)}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>

      <div className="my-pagination mt-4 flex justify-center" />
    </div>
  );
};
