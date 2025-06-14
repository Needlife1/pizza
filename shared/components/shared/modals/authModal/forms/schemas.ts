import { z } from 'zod';

export const passwordSchema = z.string().min(4, 'Введіть коректний пароль');

export const formLoginSchema = z.object({
  email: z.string().email('Введіть правильний email'),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: "Ім'я має бути не менше 2 символів" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export const updateInfoSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Ім'я має бути не менше 2 символів" }),
    email: z.string().email('Введіть правильний email'),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isChangingPassword = data.password || data.confirmPassword;

    if (isChangingPassword) {
      if (!data.password || !data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['password'],
          message: 'Обидва поля пароля є обовязковими для зміни',
        });
        return;
      }

      if (data.password.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 4,
          type: 'string',
          inclusive: true,
          path: ['password'],
          message: 'Пароль має бути не коротшим 4 символів',
        });
      }

      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: 'Паролі не збігаються',
        });
      }
    }
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TUpdateInfoValues = z.infer<typeof updateInfoSchema>;
