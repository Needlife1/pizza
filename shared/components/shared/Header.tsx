'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';

import Image from 'next/image';
import { Container } from './Container';
import Link from 'next/link';
import { SearchInput } from './SearchInput';
import { CartButton } from './CartButton';
import { ProfileButton } from './ProfileButton';
import { AuthModal } from './modals';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '../ui';
import { Menu } from 'lucide-react';
import { categories } from '@/shared/constants/navCategories';
import { MobileMenu } from './MobileMenu';

interface Props {
  hasCart?: boolean;
  hasSearch?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasCart = true,
  hasSearch = true,
  className,
}) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  if (searchParams.has('verified')) {
    setTimeout(() => {
      router.replace('/');
      toast.success('Вітаємо! Вашу почту успішно підтверджено.', {
        icon: '✅',
      });
    }, 1000);
  }

  return (
    <header
      className={cn(
        'w-full bg-white border-b px-4 sm:px-6 lg:px-8 xl:px-10 fixed top-0 z-10 sm:relative',
        className
      )}
    >
      <Container className=" flex items-center justify-between py-5 sm:py-8">
        <Link href="/">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={30}
              height={30}
              className="sm:w-[32px] sm:h-[32px] md:w-[35px] md:h-[35px]"
            />
            <div>
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl uppercase font-black">
                Next Pizza
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-gray-400 leading-3">
                смачніше вже нікуди
              </p>
            </div>
          </div>
        </Link>

        <Button
          aria-label="Меню"
          variant="outline"
          size="icon"
          className="sm:hidden -ml-1 inline-flex"
          onClick={() => setOpenMenu(true)}
        >
          <Menu size={24} />
        </Button>

        {hasSearch && (
          <div className="hidden sm:block mx-6 md:mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          {/* сделать спинер */}
          <ProfileButton
            className="hidden sm:block"
            onClickSignIn={() => {
              setOpenAuthModal(true);
            }}
          />

          {hasCart && <CartButton />}
        </div>
      </Container>

      <MobileMenu
        categories={categories}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        hasSearch={hasSearch}
        onOpenAuth={() => setOpenAuthModal(true)}
      />
    </header>
  );
};

