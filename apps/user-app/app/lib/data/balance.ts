import prisma from "@repo/db/client";

export const getBalance = async (userId: number) => {
    const balance = await prisma.balance.findUnique({
        where: { userId },
    });
    return { amount: balance?.amount || 0, locked: balance?.locked || 0 };
};
