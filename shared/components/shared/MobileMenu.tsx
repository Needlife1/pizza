'use client'
import { X } from "lucide-react";
import { ProfileButton } from "./ProfileButton";
import { SearchInput } from "./SearchInput";
import React from "react";

export const MobileMenu = ({
  open,
  onClose,
  hasSearch,
  onOpenAuth,
  categories,
}: {
  open: boolean;
  categories: string[];
  onClose: () => void;
  hasSearch?: boolean;
  onOpenAuth: () => void;
}) => {
  const [render, setRender] = React.useState(open);
  const [closing, setClosing] = React.useState(false);

  React.useEffect(() => {
    if (open) setRender(true);
    if (!open && render) setClosing(true);
  }, [open]);

  React.useEffect(() => {
    if (render) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [render]);

  const handleRequestClose = () => setClosing(true);

  const handleAnimationEnd = () => {
    if (closing) {
      setClosing(false);
      setRender(false);
      onClose();
    }
  };

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-50 sm:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={handleRequestClose}
      />

      <div
        onAnimationEnd={handleAnimationEnd}
        className={[
          'absolute right-0 top-0 h-full w-[75%] max-w-sm bg-white shadow-2xl rounded-l-2xl p-4 flex flex-col gap-4 will-change-transform',
          closing
            ? 'animate-[slideOut_.22s_ease-in]'
            : 'animate-[slideIn_.22s_ease-out]',
        ].join(' ')}
        style={{ animationFillMode: 'both' }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">Меню</span>
          <button
            className="rounded-md p-2 hover:bg-gray-100"
            onClick={handleRequestClose}
            aria-label="Закрити"
          >
            <X size={18} />
          </button>
        </div>

        {hasSearch && (
          <div className="pt-1">
            <SearchInput />
          </div>
        )}

        <div className="flex flex-col gap-5 bg-gray-50 p-1 rounded-2xl">
          {categories.map((name, i) => (
            <a
              key={i}
              href={`/#${name}`}
              className="flex items-center font-bold h-11 rounded-2xl px-5"
              onClick={handleRequestClose}
            >
              {name}
            </a>
          ))}
        </div>

        <div className="mt-auto grid gap-2">
          <ProfileButton
            className="w-full"
            onClickSignIn={() => {
              handleRequestClose();
              onOpenAuth();
            }}
          />
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
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
