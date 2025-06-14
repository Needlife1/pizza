import { getCartItemDetails } from '@/shared/lib';
import { CheckoutItem } from '../CheckoutItem';
import { WhiteBlock } from '../WhiteBlock';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/getCartDetails';
import { CheckoutItemsSkeleton } from '../CheckoutItemsSkeleton';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Кошик" className={className}>
      <div className="flex flex-col gap-10">
        {loading
          ? [...Array(3)].map((_, i) => <CheckoutItemsSkeleton key={i} />)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                disabled={item.disabled}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize
                )}
                onPlus={() =>
                  onClickCountButton(item.id, item.quantity, 'plus')
                }
                onMinus={() =>
                  onClickCountButton(item.id, item.quantity, 'minus')
                }
                onDelete={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
