import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Title } from './Title';
import Link from 'next/link';

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({
  className,
  title,
  text,
  imageUrl,
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[900px] px-4 sm:px-6 md:px-8',
        className
      )}
    >
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 sm:gap-10 md:gap-12">
        {/* Текстова частина */}
        <div className="flex flex-col text-center md:text-left">
          <div className="max-w-[620px] md:max-w-[445px] mx-auto md:mx-0">
            <Title
              size="lg"
              text={title}
              className="font-extrabold text-xl sm:text-2xl md:text-3xl"
            />
            <p className="mt-2 text-gray-500 text-sm sm:text-base md:text-lg break-words">
              {text}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-8 sm:mt-10 w-full md:w-auto">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <ArrowLeft />
                На головну
              </Button>
            </Link>

            <Link href="/profile" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-gray-600 border-gray-400 hover:bg-gray-50"
              >
                Обновити
              </Button>
            </Link>
          </div>
        </div>

        {/* Картинка */}
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-40 sm:w-56 md:w-[300px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

