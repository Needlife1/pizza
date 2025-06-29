
import { FormInput } from "../form";
import { WhiteBlock } from "../WhiteBlock";

interface Props {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {

  
 
  return (
    <WhiteBlock title="2. Персональні дані" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Імя" />
        <FormInput name="lastName" className="text-base" placeholder="Прізвище" />
        <FormInput name="email" className="text-base" placeholder="E-mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
