import { cn } from "@/shared/lib/utils";

interface Props{
    className?: string;
}

export const CheckoutItemsSkeleton:React.FC<Props> = ({ className }) => {
    return (
      <div className={cn('flex items-center justify-between', className)}>
        <div className="flex items-center gap-5">
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-full animate-pulse" />
          <h4 className="w-40 h-5 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-5 w-10  bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-[133px] bg-gray-200 rounded animate-pulse" />
      </div>
    );
};