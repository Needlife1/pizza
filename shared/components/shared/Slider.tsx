'use client';

import { IStory } from '@/shared/services/stories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


interface Props {
  stories: IStory[];
  onStoryClick: (story: IStory) => void;
}

export const Slider: React.FC<Props> = ({ stories, onStoryClick }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={5}
        loop
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        pagination={{
          el: '.my-pagination',
          clickable: true,
        }}
        className="w-full"
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <img
              src={story.previewImageUrl}
              alt="story"
              width={200}
              height={248}
              className="rounded-md cursor-pointer"
              onClick={() => onStoryClick(story)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="my-pagination mt-4 flex justify-center" />
    </div>
  );
};
