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
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
        console.error(error);
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
          <Container
            className="
      my-5 sm:my-8 md:my-10
      flex flex-col items-center
      px-4 sm:px-6 md:px-8      
    "
          >

            <Link href="/" className="self-start mb-4 text-primary hover:text-primary/90 flex items-center gap-1 text-sm md:text-base">
              <ArrowLeft  className='w-4 md:w-6'/> На головну
            </Link>


            <Title
              text={`Особисті дані: ${data.fullName}`}
              size="md"
              className="
        font-bold
        text-lg sm:text-xl md:text-2xl
        text-center sm:text-left
      "
            />

            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="
          mt-6 sm:mt-8 md:mt-10
          w-full
          max-w-[440px] sm:max-w-[520px] md:max-w-[640px]
          flex flex-col gap-3 sm:gap-4 md:gap-5
        "
              >
                <FormInput name="email" label="E-mail" required />
                <FormInput name="fullName" label="Повне імʼя" required />

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
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="
            mt-6 sm:mt-8
            w-full                
            text-sm sm:text-base 
            py-5
          "
                >
                  Зберегти
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClickSingOut}
                  disabled={form.formState.isSubmitting}
                  className="
            w-full
            text-sm sm:text-base
            py-5
          "
                >
                  Вийти
                </Button>
              </form>
            </FormProvider>
          </Container>
        );
    }

