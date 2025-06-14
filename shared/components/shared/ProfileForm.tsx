'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  TUpdateInfoValues,
  updateInfoSchema,
} from './modals/authModal/forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './Container';
import { Title } from './Title';
import { FormInput } from './form';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm({
      resolver: zodResolver(updateInfoSchema),
      defaultValues: {
        fullName: data?.fullName || '',
        email: data.email || '',
        password: '',
        confirmPassword: '',
      },
    });

    const onSubmit = async (data: TUpdateInfoValues) => {
      try {
        await updateUserInfo({
          email: data.email,
          fullName: data.fullName,
          password: data.password,
        });

        toast.success('Профіль успішно оновлено!', {
          icon: '✅',
        });
      } catch (error) {
        return toast.error('Помилка при відновленні профілю.', {
          icon: '❌',
        });
      }
    };
        const onClickSingOut = () => {
            signOut({
                callbackUrl: '/',
            });
        }


        return (
          <Container className="my-5 flex flex-col items-center ">
            <Title text={`Особисті дані: ${data.fullName}`} size="md" className="font-bold" />

            <FormProvider {...form}>
              <form
                className="flex flex-col gap-3 w-96 mt-10"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormInput name="email" label="E-mail" required />
                <FormInput name="fullName" label="Повне імя" required />
                <FormInput
                  type="password"
                  name="password"
                  label="Новий пароль"
                  required
                />
                <FormInput
                  type="password"
                  name="confirmPassword"
                  label="Повторити пароль"
                  required
                />

                <Button
                  disabled={form.formState.isSubmitting}
                  className="text-base mt-10"
                  type="submit"
                >
                  Зберегти
                </Button>

                <Button
                  onClick={onClickSingOut}
                  variant="secondary"
                  disabled={form.formState.isSubmitting}
                  className="text-base"
                  type="button"
                >
                  Вийти
                </Button>
              </form>
            </FormProvider>
          </Container>
        );
    }

