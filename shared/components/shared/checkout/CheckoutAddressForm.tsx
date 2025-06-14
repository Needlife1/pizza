"use client";

import { FormInput, FormTextarea } from "../form";
import { WhiteBlock } from "../WhiteBlock";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({className}) => {
  return (
    <WhiteBlock title="3. Адреса доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="Вкажіть адресу"
        />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Додати коментар"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};