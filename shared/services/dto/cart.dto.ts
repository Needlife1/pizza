import { pizzaSizes } from './../../constants/pizza';
import { Cart, CartItem, ProductItem, Product, Ingredient } from "@prisma/client";
// Типизация полного ответа корзины
export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product;
    };
    ingredients: Ingredient[];
}

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues{
  productItemId: number;
  ingredients?: number[];
}