import { useEffect } from 'react';
import { useCartStore } from '../store';
import { CartStateItem } from '../lib/getCartDetails';
import { CreateCartItemValues } from '../services/dto/cart.dto';

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (value: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const fetchCartItems = useCartStore((state) => state.fetchCartItem);

  const cartState = {
    items: useCartStore((state) => state.items),
    totalAmount: useCartStore((state) => state.totalAmount),
    loading: useCartStore((state) => state.loading),
    updateItemQuantity: useCartStore((state) => state.updateItemQuantity),
    removeCartItem: useCartStore((state) => state.removeCartItem),
    addCartItem: useCartStore((state) => state.addCartItem),
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return cartState;
};
