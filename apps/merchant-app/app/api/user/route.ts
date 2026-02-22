import { NextResponse } from "next/server";
import db from "@repo/db/client";

export const GET = async () => {
    const merchants = await db.merchant.findMany();
    return NextResponse.json({
        merchants
    });
};