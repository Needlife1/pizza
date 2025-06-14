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

/**
 * Форма выбора продукта
 */

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
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-gray-100 p-7">
        {isModal ? (
          <DialogTitle className="text-2xl font-bold mb-1">{name}</DialogTitle>
        ) : (
            <Title size='lg' text={name} />
        )}
        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="mt-10 h-14 px-10 text-base rounded-[18px] w-full"
        >
          Додати у кошик за {price} грн
        </Button>
      </div>
    </div>
  );
};
