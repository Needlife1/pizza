'use client';
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";
import { CartDrawer } from "./CartDrawer";
import { useCartStore } from "@/shared/store";

interface Props {
    className?: string;
    }

export const CartButton: React.FC<Props> = ({ className }) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);
 

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn(
          'group relative',
          { 'w-26': loading },
          'h-10 px-3 text-sm sm:h-11 sm:px-4 sm:text-base gap-2 sm:gap-3 disabled:cursor-wait',
          className
        )}
      >
        <b className="hidden sm:inline">{totalAmount} грн</b>
        <span className="hidden sm:inline h-full w-[1px] bg-white/30 mx-3"></span>

        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} strokeWidth={2} />
          <b
            className={cn(
              'ml-1 inline-flex items-center justify-center font-bold',
              'min-w-[20px] h-5 rounded-md bg-white/15 px-1 text-[11px] sm:bg-transparent sm:text-base sm:min-w-0 sm:h-auto sm:px-0'
            )}
          >
            {items.length}
          </b>
        </div>
        <ArrowRight
          size={20}
          className=" absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
