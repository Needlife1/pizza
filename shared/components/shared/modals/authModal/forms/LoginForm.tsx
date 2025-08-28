'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { DialogTitle } from '@radix-ui/react-dialog';

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({onClose}) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onsubmit = async (data: TFormLoginValues) => {
    try { 
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (!resp?.ok) throw Error();

      onClose?.();
      toast.success('Ви успішно увійшли в акаунт!', {
        icon: '✅',
      });
          
      } catch (error) {
          console.error('Login error:', error);
          toast.error('Помилка входу. Перевірте дані та спробуйте ще раз.', {
            icon: '🚫',
          });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onsubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <DialogTitle className="text-[26px] font-bold">
              {'Вхід у акаунт'}
            </DialogTitle>
            <p className="text-gray-400">
              Введіть електронну пошту, щоб увійти до свого акаунта.
            </p>
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
        >
          Увійти
        </Button>
      </form>
    </FormProvider>
  );
};
