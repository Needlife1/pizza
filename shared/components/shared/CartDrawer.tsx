'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  Button,
} from '../ui';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './CartDrawerItem';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { DialogTitle } from '@radix-ui/react-dialog';
import { SheetClose } from '../ui/sheet';
import { useCart } from '@/shared/hooks';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
const {
  items,
  totalAmount,
  updateItemQuantity,
  removeCartItem,
  } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    
   updateItemQuantity(id, newQuantity);
   }
  
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE] rounded-l-2xl">
        {totalAmount > 0 && (
          <SheetHeader>
            <SheetTitle>
              В корзине <span className="font-bold">{items.length} товара</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {!totalAmount && (
          <div className="flex flex-col items-center justify-center w-72 h-auto m-auto">
            <Image
              src="/assets/images/basket.png"
              alt="empty box"
              width={260}
              height={260}
            />
            <DialogTitle className="text-2xl font-bold text-center mt-4">
              Корзина пуста
            </DialogTitle>
            <p className="text-center mt-5 text-neutral-500">
              Додайте товар щоб зробити замовлення
            </p>

            <SheetClose
              className="w-56 h-12 mt-5 text-base bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md active:translate-y-[1px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              type="button"
            >
              <ArrowLeft className="w-5 mr-2" />
              До головної
            </SheetClose>
          </div>
        )}

        {totalAmount > 0 && (
          <>
            <div className="mt-5 overflow-auto flex-1 flex flex-col gap-2">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  disabled={item.disabled}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
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

            <SheetFooter
              className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur
               supports-[backdrop-filter]:bg-white/70 border-t
               px-3 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6
               pb-[max(1rem,env(safe-area-inset-bottom))]"
            >
              <div className="w-full">
                <div className="flex items-baseline mb-3 sm:mb-4">
                  <span className="flex items-center flex-1 text-base sm:text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>

                  <span className="font-bold tabular-nums text-base sm:text-xl md:text-2xl">
                    {totalAmount} гнр
                  </span>
                </div>

                <Link href="/checkout">
                  <Button
                    onClick={() => setRedirecting(true)}
                    loading={redirecting}
                    type="submit"
                    className="w-full h-12 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg rounded-xl"
                  >
                    Оформити замовлення
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
