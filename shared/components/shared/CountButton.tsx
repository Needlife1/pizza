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
        'inline-flex items-center justify-between gap-3',
        className
      )}
    >
      <Button
        type='button'
        variant="outline"
        className={cn(
          'p-0 hover:bg-primary hover:text-white',
          size === 'sm'
            ? 'w-[30px] h-[30px] rounded-sm'
            : 'w-[38px] h-[38px] rounded-se-md'
        )}
        onClick={onMinus}
        disabled={value === 1}
      >
        <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
      </Button>
      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>
      <Button
        type='button'
        variant="outline"
        className={cn(
          'p-0 hover:bg-primary hover:text-white',
          size === 'sm'
            ? 'w-[30px] h-[30px] rounded-sm'
            : 'w-[38px] h-[38px] rounded-md'
        )}
        onClick={onPlus}
      >
        <Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
      </Button>
    </div>
  );
};
