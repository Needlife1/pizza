import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  return (
    <div
      className={cn(
        'relative flex w-full flex-1 items-center justify-center',
        'min-h-[320px]',
        {
          'lg:min-h-[450px]': size === 20,
          'lg:min-h-[550px]': size === 30,
          'lg:min-h-[650px]': size === 40,
        },
        className
      )}
    >
      <img
        src={imageUrl}
        alt="Pizza"
        className={cn(
          'relative left-2 top-2 z-5 transition-all duration-300',
          'w-[260px] h-[260px] sm:w-[310px] sm:h-[310px]',
          {
            'lg:w-[350px] lg:h-[350px]': size === 20,
            'lg:w-[450px] lg:h-[450px]': size === 30,
            'lg:w-[500px] lg:h-[500px]': size === 40,
          }
        )}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      hidden xl:block border-dashed border-2 rounded-full border-gray-200
      w-[min(88vw,45px)] h-[min(88vw,450px)]"
      ></div>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      hidden xl:block border-dashed border-2 rounded-full border-gray-100
      w-[min(72vw,390px)] h-[min(72vw,390px)]"
      ></div>
    </div>
  );
};
