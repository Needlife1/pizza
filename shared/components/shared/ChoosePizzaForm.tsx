'use client';

import { cn } from '@/shared/lib/utils';
import { PizzaImage } from './PizzaImage';
import { Button } from '../ui';
import { GroupVariants } from './GroupVariants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './IngredientItem';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';
import { DialogTitle } from '@radix-ui/react-dialog';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  isModal: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

/**
 * Форма для выбора пиццы
 */

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  className,
  ingredients,
  items,
  loading,
  isModal,
  onSubmit,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    items,
    size,
    type,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) onSubmit(currentItemId, Array.from(selectedIngredients));
   
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-gray-100 p-7">
        {/* Поставить кастомный заголовок */}
        {isModal ? (
          <DialogTitle className="text-2xl font-bold mb-1">{name}</DialogTitle>
        ) : (
          <h2 className="text-2xl font-bold mb-1">{name}</h2>
        )}

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="mt-10 h-14 px-10 text-base rounded-[18px] w-full"
        >
          Додати до кошика за {totalPrice} грн
        </Button>
      </div>
    </div>
  );
};
