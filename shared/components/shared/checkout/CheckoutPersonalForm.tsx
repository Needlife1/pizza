
import { FormInput } from "../form";
import { WhiteBlock } from "../WhiteBlock";

interface Props {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональні дані" className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9 pb-8">
        <FormInput
          name="firstName"
          placeholder="Імʼя"
          className="h-11 sm:h-12 text-sm sm:text-base"
          autoComplete="given-name"
        />
        <FormInput
          name="lastName"
          placeholder="Прізвище"
          className="h-11 sm:h-12 text-sm sm:text-base"
          autoComplete="family-name"
        />
        <FormInput
          name="email"
          type="email"
          placeholder="E-mail"
          className="h-11 sm:h-12 text-sm sm:text-base"
          autoComplete="email"
          inputMode="email"
        />
        <FormInput
          name="phone"
          type="tel"
          placeholder="Телефон"
          className="h-11 sm:h-12 text-sm sm:text-base"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
    </WhiteBlock>
  );
};
