'use client';

import React, { useEffect, useRef } from 'react';
import { Title } from './Title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './ProductCard';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  className,
  listClassName,
  categoryId,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null!);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection]);

  return (
    <div
      className={cn(
        'px-4 sm:px-6 lg:px-8 xl:px-10',
        'py-6 sm:py-8 lg:py-10',
        className
      )}
      id={title}
      ref={intersectionRef}
    >
      <Title
        text={title}
        size="lg"
        className={cn(
          'font-extrabold mb-4 sm:mb-5 lg:mb-6',
          'text-xl sm:text-2xl lg:text-3xl'
        )}
      />

      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          'gap-4 sm:gap-6 lg:gap-10',
          'items-stretch',
          listClassName
        )}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
