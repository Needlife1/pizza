'use client';

import {
  DialogContent,
  Dialog,
} from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../ProductForm';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product}) => {
  const router = useRouter();
  
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="md:min-h-[500px]">
        <ProductForm product={product} isModal onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
