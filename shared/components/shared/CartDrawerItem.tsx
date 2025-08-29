
import { cn } from "@/shared/lib/utils"
import { CartItemProps } from "./cartItemDetails/cartItemDetails";
import { CartItemDetailsImage } from "./cartItemDetails/CartItemDetailsImage";
import { CartItemInfo } from "./cartItemDetails/CartItemInfo";
import { CountButton } from "./CountButton";
import { CartItemDetailsPrice } from "./cartItemDetails/CartItemDetailsPrice";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  onPlus?: () => void;
  onMinus?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onPlus,
  onMinus,
  onDelete,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <CartItemDetailsImage src={imageUrl} />

      <div className="flex-1">
        <CartItemInfo name={name} details={details} />

        <hr className="my-3" />
        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
          <CountButton onMinus={onMinus} onPlus={onPlus} value={quantity} />

          <div className="flex items-center gap-2">
            <CartItemDetailsPrice
              value={price}
              className="tabular-nums whitespace-nowrap text-base sm:text-lg md:text-xl"
            />
            <Trash2Icon
              onClick={onDelete}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};