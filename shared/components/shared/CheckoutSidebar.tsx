import { ArrowRight, Package, Percent, TruckIcon } from "lucide-react";
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
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Підсумок</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-3xl font-bold">{totalPrice}грн</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Вартість товару:
          </div>
        }
        value={
          loading ? <Skeleton className="h-6 w-24" /> : `${totalAmount}грн`
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <TruckIcon size={18} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={
          loading ? <Skeleton className="h-6 w-24" /> : `${DELIVERY_PRICE}грн`
        }
      />

      <Button
        type="submit"
        loading = {loading}
        // disabled={!totalAmount || submitting}
        className="mt-6 w-full rounded-2xl h-14 font-bold text-base"
      >
        Перейти до оплати
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};