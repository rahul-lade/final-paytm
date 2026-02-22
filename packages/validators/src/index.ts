import { z } from "zod";

export const PhoneSchema = z.string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number is too long" })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" });

export const PasswordSchema = z.string()
    .min(6, { message: "Password must be at least 6 characters" });

export const AmountSchema = z.number()
    .positive({ message: "Amount must be greater than 0" })
    .max(100000000, { message: "Amount exceeds maximum limit" }); // Max 10 lakhs roughly depending on currency

export const LoginSchema = z.object({
    phone: PhoneSchema,
    password: PasswordSchema
});

export const SignupSchema = z.object({
    phone: PhoneSchema,
    password: PasswordSchema,
    name: z.string().min(2, { message: "Name is required" }).optional()
});

export const TransferSchema = z.object({
    to: PhoneSchema,
    amount: AmountSchema
});

export const OnRampSchema = z.object({
    amount: AmountSchema,
    provider: z.string().min(1, { message: "Provider is required" })
});

// Bank Webhook Simulated Signature Body
export const BankWebhookSchema = z.object({
    token: z.string().min(1),
    userId: z.string().min(1),
    amount: z.string() // Usually comes as string in webhooks
});
