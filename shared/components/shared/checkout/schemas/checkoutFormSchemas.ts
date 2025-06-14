import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Імя повинно містити принаймні 2 символи' }),
  lastName: z
    .string()
    .min(2, { message: 'Прізвище повинно містити принаймні 2 символи' }),
  email: z.string().email({ message: 'Невірний формат електронної пошти' }),
  phone: z
    .string()
    .min(10, { message: 'Введіть коректній номер телефону' })
    .regex(/^\d+$/, { message: 'Номер телефону повинен містити лише цифри' }),
  address: z.string().min(5, { message: 'Введіть коректну адресу' }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>