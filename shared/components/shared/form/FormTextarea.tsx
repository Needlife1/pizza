'use client';

import { useFormContext } from 'react-hook-form';
import { Textarea } from '../../ui';
import { ClearButton } from '../ClearButton';
import { ErrorText } from '../ErrorText';
import { RequestSymbol } from '../RequestSymbol';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClear = () => {
    setValue(name, '', {
      shouldValidate: true,
    });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label}
          {required && <RequestSymbol />}
        </p>
      )}
      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
