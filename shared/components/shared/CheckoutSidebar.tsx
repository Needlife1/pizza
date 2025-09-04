import { ArrowRight, Package, TruckIcon } from "lucide-react";
import { CheckoutItemDetails } from "./CheckoutItemDetails";
import { WhiteBlock } from "./WhiteBlock";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";
import { DELIVERY_PRICE } from "@/shared/constants/pizza";

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
}) => {
  const totalPrice = totalAmount + DELIVERY_PRICE;

  return (
    <WhiteBlock
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm',
        'p-4 sm:p-5 lg:p-6',
        'lg:sticky lg:top-4',
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-lg sm:text-xl">Підсумок</span>
        {loading ? (
          <Skeleton className="h-9 w-40 sm:h-11 sm:w-48" />
        ) : (
          <span className="h-10 sm:h-11 text-2xl sm:text-3xl font-bold">
            {totalPrice}грн
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            <span className="text-sm sm:text-base">Вартість товару:</span>
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-5 w-24 sm:h-6 sm:w-28" />
          ) : (
            <span className="text-sm sm:text-base">{`${totalAmount}грн`}</span>
          )
        }
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <TruckIcon size={18} className="mr-2 text-gray-300" />
            <span className="text-sm sm:text-base">Доставка:</span>
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-5 w-24 sm:h-6 sm:w-28" />
          ) : (
            <span className="text-sm sm:text-base">{`${DELIVERY_PRICE}грн`}</span>
          )
        }
      />

      <Button
        type="submit"
        loading={loading}
        className={cn(
          'mt-5 sm:mt-6 w-full rounded-2xl',
          'h-12 sm:h-14 text-sm sm:text-base font-bold'
        )}
      >
        Перейти до оплати
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
