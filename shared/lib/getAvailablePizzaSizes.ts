import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/GroupVariants";

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]):Variant[] => {
     const filteredPizzas = items.filter((item) => item.pizzaType === type);
    
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzas.some(
          (pizza) => Number(pizza.size) === Number(item.value)
        ),
      }));
}