
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
      <main className="min-h-screen bg-[#F4F1EE]">
        <Container>
          <Suspense fallback={<div>Завантаження…</div>}>
            <Header
              hasCart={false}
              hasSearch={false}
              className="border-b-gray-200"
            />
            {children}
          </Suspense>
        </Container>
      </main>
    );
}
