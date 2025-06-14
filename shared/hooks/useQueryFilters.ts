import { useEffect, useRef } from "react";
import { Filter } from './useFilters';
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filter) => {
  const isMounted = useRef(false);
  const router = useRouter();
  const prevQueryRef = useRef<string>('');

    useEffect(() => {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      if (query !== prevQueryRef.current) {
        prevQueryRef.current = query;
        router.push(`/?${query}`, { scroll: false });
      }

      isMounted.current = true;

    }, [filters, router]);
};
