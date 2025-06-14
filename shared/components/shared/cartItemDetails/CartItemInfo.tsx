import { cn } from "@/shared/lib/utils";

interface Props{
    name: string;
  details: string
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
 
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-1">{name}</h2>
      </div>
      {details.length > 0 && (
        <p className="text-sx text-gray-400 mt-2 w-[90%]">{details}</p>
      )}
    </div>
  );
};