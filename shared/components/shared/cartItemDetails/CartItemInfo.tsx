import { cn } from '@/shared/lib/utils';

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        <h2
          className={cn(
            'font-bold flex-1 leading-tight',
            'text-base sm:text-lg md:text-xl lg:text-2xl'
          )}
        >
          {name}
        </h2>
      </div>

      {details.length > 0 && (
        <p
          className={cn(
            'text-gray-400 mt-1 sm:mt-2',
            'text-xs sm:text-sm md:text-base',
            'w-full sm:w-[95%] md:w-[90%] lg:w-[85%]'
          )}
        >
          {details}
        </p>
      )}
    </div>
  );
};