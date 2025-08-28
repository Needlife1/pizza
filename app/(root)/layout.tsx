import type { Metadata } from 'next';
import { Header } from '@/shared/components/shared/Header';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Pizza | Main',
  description: 'Bast Pizza in the World',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-25 sm:py-8 lg:py-10">
        {children}
        {modal}
      </div>
    </main>
  );
}
