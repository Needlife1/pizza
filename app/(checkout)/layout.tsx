
import { Container, Header } from "@/shared/components/shared";
import { Suspense } from "react";

export const metadata = {
  title: 'Next Pizza | Кошик',
  Description: 'Next Pizza | Кошик',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <main className="bg-[#F4F1EE]">
        <Container className="max-w-full">
          <Suspense fallback={<div>Завантаження…</div>}>
            <Header
              hasCart={false}
              hasSearch={false}
              className="border-b-gray-200"
            />
            <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-25 sm:py-8 lg:py-10">
              {children}
            </div>
          </Suspense>
        </Container>
      </main>
    );
}
