
import { cn } from '@/shared/lib/utils';
import React from 'react';
import Image from 'next/image';
import { Container } from './Container';
import Link from 'next/link';
import { SearchInput } from './SearchInput';
import { CartButton } from './CartButton';
import { ProfileButton } from './ProfileButton';
import { AuthModal } from './modals';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

  // НЕ викликати setState під час рендера
  React.useEffect(() => {
    if (searchParams.has('verified')) {
      toast.success('Вітаємо! Вашу почту успішно підтверджено.', {
        icon: '✅',
      });
      router.replace('/');
    }
  }, [searchParams, router]);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-3 sm:py-4 md:py-6 lg:py-8">
        {/* Ліва частина: бургер (мобільний) + логотип */}
        <div className="flex items-center gap-2">
          {/* Бургер видно лише на мобільних */}
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpenMenu(true)}
            className="sm:hidden -ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/logo.png"
                alt="logo"
                width={30}
                height={30}
                className="sm:w-[32px] sm:h-[32px] md:w-[35px] md:h-[35px]"
              />
              <div className="leading-tight">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl uppercase font-black">
                  Next Pizza
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-gray-400 leading-3">
                  смачніше вже нікуди
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Пошук:
            - мобільний: схований (у дроуері)
            - sm+ : повний інпут у хедері */}
        {hasSearch && (
          <div className="hidden sm:block mx-6 md:mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Праворуч:
            - мобільний: показуємо тільки кошик (за потреби), профіль/логін у дроуері
            - sm+ : все як було */}
        <div className="flex items-center gap-2 sm:gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <div className="hidden sm:block">
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          </div>

          {hasCart && <CartButton />}
        </div>
      </Container>

      {/* Дроуер для мобільних: пошук + логін/реєстрація + навігація */}
      <MobileMenu
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        hasSearch={hasSearch}
        onOpenAuth={() => setOpenAuthModal(true)}
        hasCart={hasCart}
      />
    </header>
  );
};

/* ====== Мобільне меню (дроуер) ====== */
function MobileMenu({
  open,
  onClose,
  hasSearch,
  onOpenAuth,
  hasCart,
}: {
  open: boolean;
  onClose: () => void;
  hasSearch?: boolean;
  onOpenAuth: () => void;
  hasCart?: boolean;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 sm:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Тінь */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Панель */}
      <div
        className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl rounded-l-2xl p-4 flex flex-col gap-4 animate-[slideIn_.2s_ease-out] will-change-transform"
        style={{ animationFillMode: 'both' }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">Меню</span>
          <button
            className="rounded-md p-2 hover:bg-gray-100"
            onClick={onClose}
            aria-label="Закрити"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {hasSearch && (
          <div className="pt-1">
            <SearchInput autoFocus placeholder="Пошук піци, інгредієнтів…" />
          </div>
        )}

        {/* Навігація — приклади лінків, за потреби заміни */}
        <nav className="mt-1 grid gap-1.5">
          <Link
            href="/menu"
            className="rounded-xl px-3 py-2 hover:bg-gray-50"
            onClick={onClose}
          >
            Меню
          </Link>
          <Link
            href="/deals"
            className="rounded-xl px-3 py-2 hover:bg-gray-50"
            onClick={onClose}
          >
            Акції
          </Link>
          <Link
            href="/contacts"
            className="rounded-xl px-3 py-2 hover:bg-gray-50"
            onClick={onClose}
          >
            Контакти
          </Link>
        </nav>

        <div className="mt-auto grid gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="h-11 rounded-xl bg-black text-white font-medium hover:opacity-90"
          >
            Увійти / Зареєструватися
          </button>

          {hasCart && (
            <div className="h-11 rounded-xl border border-gray-200 flex items-stretch">
              <CartButton className="flex-1 rounded-xl" />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0.6;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
