import { cn } from "@/shared/lib/utils"

interface Props {
    src: string;
    className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({src, className }) => {
  return <img className={cn('w-15 h-15', className)} src={src} />;
};