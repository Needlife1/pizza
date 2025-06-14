import { calcTotalPizzaPrice } from "./calcTotalPizzaPrice";
import { Ingredient, ProductItem } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getPizzaDetails = (
  items: ProductItem[],
  size: PizzaSize,
  type: PizzaType,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    items,
    size,
    type,
    ingredients,
    selectedIngredients
  );

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

return {
    totalPrice,
    textDetails,
}
};