import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Title } from './Title';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  className?: string;
  loading?: boolean;
  onSubmit?: VoidFunction;
  isModal: boolean;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  className,
  loading,
  onSubmit,
  isModal,
}) => {
  

  return (
    <div
      className={cn(
        className,
        'flex flex-col md:flex-row flex-1 w-full max-w-full overflow-hidden'
      )}
    >
      <div className="relative w-full md:flex-1 flex items-center justify-center p-4 sm:p-6 md:p-0">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className={cn(
            'object-contain transition-all duration-300',
            'w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px]'
          )}
        />
      </div>

      <div className="w-full md:w-[490px] bg-gray-100 p-4 sm:p-6 md:p-7 rounded-t-2xl md:rounded-none">
        {isModal ? (
          <DialogTitle className="text-xl sm:text-2xl font-bold mb-1">
            {name}
          </DialogTitle>
        ) : (
          <Title size="lg" text={name} />
        )}

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="mt-6 sm:mt-8 md:mt-10 h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base rounded-[14px] sm:rounded-[18px] w-full"
        >
          Додати у кошик за {price} грн
        </Button>
      </div>
    </div>
  );
};
