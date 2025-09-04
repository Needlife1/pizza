import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
    className?: string;
    name: string;
    imageUrl: string;
    price: number;
    active?: boolean;
    onClick?: () => void;
}

export const IngredientItem: React.FC<Props> = ({ className, name, imageUrl, price, active, onClick }) => {
  
 
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-28 sm:w-55 md:w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img src={imageUrl} alt={name} width={110} height={110} />
      <span className="mt-1 text-[11px] sm:text-xs md:text-sm leading-tight line-clamp-2">
        {name}
      </span>

      <span className="mt-0.5 font-bold text-sm sm:text-base md:text-lg">
        {price}грн
      </span>
    </div>
  );
}