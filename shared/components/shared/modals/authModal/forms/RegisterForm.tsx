'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';
import { DialogTitle } from '@radix-ui/react-dialog';
import { signIn } from 'next-auth/react'; 

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onsubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Реєстрація успішна! Підтвердіть свою пошту.', {
        icon: '✅',
      });

      await signIn('credentials', {
        redirect: true, 
        email: data.email,
        password: data.password,
        callbackUrl: '/', 
      });

      onClose?.();
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Помилка входу. Перевірте дані та спробуйте ще раз.', {
        icon: '🚫',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onsubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <DialogTitle className="text-[26px] font-bold">
              {'Реєстрація'}
            </DialogTitle>
            <p className="text-gray-400">Введіть дани, щоб зареєструватися.</p>
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Повне Ім'я" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Повторити пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зареєструватися
        </Button>
      </form>
    </FormProvider>
  );
};
