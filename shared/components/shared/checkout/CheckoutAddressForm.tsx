'use client';

import { FormInput, FormTextarea } from '../form';
import { WhiteBlock } from '../WhiteBlock';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адреса доставки" className={className}>
      <div className="flex flex-col gap-7 sm:gap-8">
        <FormInput
          name="address"
          placeholder="Вкажіть адресу"
          className="h-11 sm:h-12 text-sm sm:text-base"
          autoComplete="street-address"
        />

        <FormTextarea
          name="comment"
          placeholder="Додати коментар"
          rows={5}
          className="resize-y min-h-[120px] sm:min-h-[140px] text-sm sm:text-base"
        />
      </div>
    </WhiteBlock>
  );
};