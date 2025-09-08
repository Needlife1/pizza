'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCart } from '@/shared/hooks';
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from '@/shared/components/shared/checkout';
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/shared/components/shared/checkout/schemas/checkoutFormSchemas';
import { CheckoutSidebar, Container, Title } from '@/shared/components/shared';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/api-client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } = useCart();
  const { data: session } = useSession();


  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session, form]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      
      toast.error('Замовлення успішно створено! Перехід до оплати...', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }

    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error('Не вдалося створити замовлення', {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  
  return (
    <Container className="mt-10">
      <Link
        href="/"
        className="self-start mb-4 text-primary hover:text-primary/90 flex items-center gap-1 text-sm md:text-base"
      >
        <ArrowLeft className="w-4 md:w-6" /> На головну
      </Link>

      <Title
        text="Оформити замовлення"
        className="font-extrabold mb-8 text-4xl"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="lg:flex gap-10">
            <div className="flex flex-col gap-5 md:gap-10 flex-1 mb-5 md:mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />

              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>

            <div className="lg:w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
