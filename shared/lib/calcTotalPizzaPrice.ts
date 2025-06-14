import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для расчета общей цены пиццы
 * @param items - список вариаций
 * @param size - размер пиццы
 * @param type - тип теста пиццы
 * @param ingredients - массив ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns - number общая цена пиццы
 */

export const calcTotalPizzaPrice = (
  items: ProductItem[],
  size: PizzaSize,
  type: PizzaType,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
            ?.price || 0;
    
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};