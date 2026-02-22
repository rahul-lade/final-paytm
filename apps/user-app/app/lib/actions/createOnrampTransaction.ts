"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { OnRampSchema } from "@repo/validators";

export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            success: false,
            message: "Unauthenticated request"
        }
    }

    const parsed = OnRampSchema.safeParse({ provider, amount });
    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0]?.message || "Invalid input"
        }
    }

    const token = crypto.randomUUID();

    try {
        await prisma.onRampTransaction.create({
            data: {
                provider,
                status: "Processing",
                startTime: new Date(),
                token: token,
                userId: Number(session?.user?.id),
                amount: amount * 100 // Convert to paise/cents
            }
        });

        return {
            success: true,
            message: "Transaction initiated"
        }
    } catch (e) {
        return {
            success: false,
            message: "Failed to initiate transaction"
        }
    }
}
