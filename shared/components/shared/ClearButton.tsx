import { X } from 'lucide-react';

interface Props {
  onClick?: VoidFunction;
}

export const ClearButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-1/2 right-4 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
    >
      <X className="h-5 w-5" />
    </button>
  );
};
