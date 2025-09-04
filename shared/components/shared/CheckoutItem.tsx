import { cn } from "@/shared/lib/utils";
import { CartItemProps } from "./cartItemDetails/cartItemDetails";
import { CartItemDetailsImage } from "./cartItemDetails/CartItemDetailsImage";
import { CartItemDetailsPrice } from "./cartItemDetails/CartItemDetailsPrice";
import { CartItemInfo } from "./cartItemDetails/CartItemInfo";
import { CountButton } from "./CountButton";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  onPlus?: () => void;
  onMinus?: () => void;
    onDelete?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  onPlus,
  onMinus,
  onDelete,
  details,
  disabled,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full rounded-xl border border-gray-100 bg-white',
        'p-3 sm:p-4 md:p-5',
        'flex flex-col gap-3',
        'sm:flex-row sm:items-center sm:gap-4',
        'md:justify-between',
        { 'opacity-50 pointer-events-none': disabled },
        className
      )}
    >
      <div
        className={cn(
          'flex items-start gap-3',
          'sm:items-center sm:gap-4',
          'sm:flex-1'
        )}
      >
        <CartItemDetailsImage
          src={imageUrl}
          className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-18 sm:w-18 md:h-20 md:w-20"
        />

        <div className="min-w-0 flex-1">
          <CartItemInfo
            name={name}
            details={details}
            className="space-y-1"
          />

          <div className="mt-2 sm:hidden">
            <CartItemDetailsPrice
              value={price}
              className="text-base font-semibold"
            />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <CartItemDetailsPrice
          value={price}
          className="text-base md:text-lg font-semibold"
        />
      </div>

      <div
        className={cn(
          'mt-1 flex items-center justify-between',
          'sm:mt-0 sm:justify-end sm:gap-4 md:gap-5 lg:ml-20'
        )}
      >
        <CountButton
          onMinus={onMinus}
          onPlus={onPlus}
          value={quantity}
          className="h-9 sm:h-8 md:h-9"
        />

        <button
          type="button"
          onClick={onDelete}
          aria-label="Remove item"
          className={cn(
            'group -mr-1 inline-flex items-center justify-center',
            'h-10 w-10 sm:h-8 sm:w-8 md:h-9 md:w-9',
            'rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          )}
        >
          <Trash2Icon className="h-5 w-5 sm:h-4 sm:w-4 md:h-4 md:w-4 transition-colors" />
        </button>
      </div>
    </div>
  );
};
