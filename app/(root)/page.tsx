import {
  Container,
  TopBar,
  Filter,
  ProductsGroupList,
  Stories,
} from '@/shared/components/shared';
import { Suspense } from 'react';
import { GetSearchParams, findPizzas } from '@/shared/lib/findPizzas';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const resolvedParams = await searchParams;

  const categories = await findPizzas(resolvedParams);

  return (
    <>
      <TopBar
        className="hidden sm:block"
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Stories />

      <Container className=" mt-10 pb-14">
        <div className="md:flex gap-18">
          {/* фильтрация */}
          <div className="w-full md:w-[200px] xl:w-[250px] block">
            <Suspense>
              <Filter />
            </Suspense>
          </div>
          {/* список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
