import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { cn } from '@/shared/lib/utils';

export interface FilterChecboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        id={`checkbox-${String(name)}-${String(value)}`}
        className={cn(
          'rounded-[6px]',
          'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'
        )}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className={cn(
          'leading-none cursor-pointer flex-1',
          'text-xs sm:text-sm md:text-base'
        )}
      >
        {text}
      </label>
      {endAdornment && (
        <div className="text-xs sm:text-sm md:text-base">{endAdornment}</div>
      )}
    </div>
  );
};
