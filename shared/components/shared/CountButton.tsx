import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';

interface Props {
  value?: number;
  size?: 'sm' | 'lg';
  className?: string;
  onMinus?: () => void;
  onPlus?: () => void;
}

export const CountButton: React.FC<Props> = ({
  value = 1,
  size = 'sm',
  className,
  onMinus,
  onPlus,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-between gap-2 sm:gap-3 md:gap-4',
        className
      )}
    >
      <Button
        type="button"
        variant="outline"
        className={cn(
          'p-0 hover:bg-primary hover:text-white',
          size === 'sm'
            ? 'w-[28px] h-[28px] rounded-sm sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px]'
            : 'w-[34px] h-[34px] rounded-sm sm:w-[38px] sm:h-[38px] md:w-[42px] md:h-[42px] md:rounded-md'
        )}
        onClick={onMinus}
        disabled={value === 1}
      >
        <Minus
          className={size === 'sm' ? 'h-4 sm:h-5 md:h-6' : 'h-5 sm:h-6 md:h-7'}
        />
      </Button>

      <b
        className={cn(
          size === 'sm'
            ? 'text-xs sm:text-sm md:text-base'
            : 'text-sm sm:text-md md:text-lg'
        )}
      >
        {value}
      </b>

      <Button
        type="button"
        variant="outline"
        className={cn(
          'p-0 hover:bg-primary hover:text-white',
          size === 'sm'
            ? 'w-[28px] h-[28px] rounded-sm sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px]'
            : 'w-[34px] h-[34px] rounded-sm sm:w-[38px] sm:h-[38px] md:w-[42px] md:h-[42px] md:rounded-md'
        )}
        onClick={onPlus}
      >
        <Plus
          className={size === 'sm' ? 'h-4 sm:h-5 md:h-6' : 'h-5 sm:h-6 md:h-7'}
        />
      </Button>
    </div>
  );
};