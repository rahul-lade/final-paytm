import prisma from "@repo/db/client";

export const getRecentTransactions = async (userId: number, limit = 5) => {
    const [onRamp, p2pSent, p2pReceived] = await Promise.all([
        prisma.onRampTransaction.findMany({
            where: { userId },
            orderBy: { startTime: "desc" },
            take: limit,
        }),
        prisma.p2pTransfer.findMany({
            where: { fromUserId: userId },
            orderBy: { timestamp: "desc" },
            take: limit,
        }),
        prisma.p2pTransfer.findMany({
            where: { toUserId: userId },
            orderBy: { timestamp: "desc" },
            take: limit,
        }),
    ]);

    const all = [
        ...onRamp.map((t) => ({
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider,
            type: "onramp" as const,
        })),
        ...p2pSent.map((t) => ({
            time: t.timestamp,
            amount: t.amount,
            status: "Success",
            provider: "P2P",
            type: "p2p_sent" as const,
        })),
        ...p2pReceived.map((t) => ({
            time: t.timestamp,
            amount: t.amount,
            status: "Success",
            provider: "P2P",
            type: "p2p_received" as const,
        })),
    ];

    all.sort((a, b) => b.time.getTime() - a.time.getTime());
    return all.slice(0, limit);
};

export const getOnRampTransactions = async (userId: number, limit = 10) => {
    const txns = await prisma.onRampTransaction.findMany({
        where: { userId },
        orderBy: { startTime: "desc" },
        take: limit,
    });
    return txns.map((t) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
};

export const getPaginatedTransactions = async (userId: number, skip = 0, limit = 10) => {
    const [onRamp, p2pSent, p2pReceived] = await Promise.all([
        prisma.onRampTransaction.findMany({
            where: { userId },
            orderBy: { startTime: "desc" },
            take: skip + limit + 1, // +1 to check for hasMore
        }),
        prisma.p2pTransfer.findMany({
            where: { fromUserId: userId },
            orderBy: { timestamp: "desc" },
            take: skip + limit + 1,
            include: { toUser: { select: { name: true, number: true } } },
        }),
        prisma.p2pTransfer.findMany({
            where: { toUserId: userId },
            orderBy: { timestamp: "desc" },
            take: skip + limit + 1,
            include: { fromUser: { select: { name: true, number: true } } },
        }),
    ]);

    const all = [
        ...onRamp.map((t) => ({
            id: `onramp-${t.id}`,
            description: `Bank Deposit • ${t.provider}`,
            amount: t.amount,
            status: t.status,
            date: t.startTime,
            type: "credit" as const,
            channel: "Bank",
        })),
        ...p2pSent.map((t) => ({
            id: `p2p-sent-${t.id}`,
            description: `Sent to ${t.toUser?.name || t.toUser?.number || "User"}`,
            amount: t.amount,
            status: "Success",
            date: t.timestamp,
            type: "debit" as const,
            channel: "P2P",
        })),
        ...p2pReceived.map((t) => ({
            id: `p2p-recv-${t.id}`,
            description: `Received from ${t.fromUser?.name || t.fromUser?.number || "User"}`,
            amount: t.amount,
            status: "Success",
            date: t.timestamp,
            type: "credit" as const,
            channel: "P2P",
        })),
    ];

    all.sort((a, b) => b.date.getTime() - a.date.getTime());

    const hasMore = all.length > skip + limit;
    const paginated = all.slice(skip, skip + limit);

    return { data: paginated, hasMore };
};
