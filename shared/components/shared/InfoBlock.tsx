import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Title } from './Title';
import { redirect } from 'next/navigation';

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

//   const back = () => {
//     redirect('/');
// }

  return (
    <div
      className={cn(
        className,
        'flex items-center justify-between w-[840px] gap-12'
      )}
    >
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <div className="flex gap-5 mt-11">
          {/* Доделать редирект */}
          <Button variant="outline" className="gap-2">
            <ArrowLeft />
            На головну
          </Button>
          <Button
            variant="outline"
            className="text-gray-500 border-gray-400 hover:bg-gray-50"
          >
            Обновити
          </Button>
        </div>
      </div>

      <img src={imageUrl} alt={title} width={300} />
    </div>
  );
};
