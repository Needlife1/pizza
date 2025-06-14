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
    <div className={cn('flex items-center justify-between',
      {
        'opacity-50 pointer-events-none': disabled,
      },
      className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>

      <CartItemDetailsPrice value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CountButton onMinus={onMinus} onPlus={onPlus} value={quantity} />

          <Trash2Icon
            onClick={onDelete}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={16}
          />
       
      </div>
    </div>
  );
};