"use server";

import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { SignupSchema } from "@repo/validators";

export async function signup(phone: string, password: string, name?: string) {
    const parsed = SignupSchema.safeParse({ phone, password, name });
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const existingUser = await db.user.findFirst({
        where: { number: phone }
    });

    if (existingUser) {
        return { success: false, message: "Account with this phone number already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    number: phone,
                    password: hashedPassword,
                    name: name || undefined
                }
            });

            await tx.balance.create({
                data: {
                    userId: user.id,
                    amount: 0,
                    locked: 0
                }
            });
        });

        return { success: true, message: "Account created successfully" };
    } catch (e) {
        console.error(e);
        return { success: false, message: "Failed to create account" };
    }
}
