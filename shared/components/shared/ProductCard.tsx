import Link from 'next/link'
import React from 'react'
import { Title } from './Title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';
import { cn } from '@/shared/lib/utils';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({id, name, price, imageUrl, ingredients, className }) => {
  return (
    <div
      className={cn(
        `flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200`,
        className
      )}
    >
      <Link href={`/product/${id}`} className="flex flex-col h-full p-4">
        <div className="flex justify-center items-center bg-secondary/20 rounded-lg overflow-hidden aspect-square">
          <img
            className="w-full h-full object-contain p-4"
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title
          text={name}
          size="sm"
          className="mt-3 mb-1 font-bold text-gray-900 line-clamp-2"
        />

        <p className="text-sm text-gray-400">
          {ingredients.map((ingredient) => ingredient.name).join(', ')}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg sm:text-xl text-gray-800">
            <b>{price} грн</b>
          </span>

          <Button
            variant="secondary"
            className="flex items-center text-sm sm:text-base font-bold"
          >
            <Plus size={20} className="mr-1" />
            Додати
          </Button>
        </div>
      </Link>
    </div>
  );
};

