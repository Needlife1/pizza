'use client';

import {
  DialogContent,
  Dialog,
} from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../ProductForm';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] !max-w-[1060px] !min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <ProductForm
          product={product}
          isModal={true}
          onSubmit={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  );
};
