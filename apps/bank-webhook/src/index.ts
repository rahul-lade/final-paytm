import express from "express";
import db from "@repo/db/client";
import crypto from "crypto";
import { BankWebhookSchema } from "@repo/validators";

const app = express();

app.use(express.json())

const SIMULATED_BANK_SECRET = process.env.BANK_WEBHOOK_SECRET;

app.post("/hdfcWebhook", async (req, res) => {
    // 1. Verify Authentication/Signature
    const signature = req.headers["x-webhook-signature"];

    if (!SIMULATED_BANK_SECRET || !signature || typeof signature !== "string") {
        return res.status(401).json({ message: "Invalid signature" });
    }

    try {
        const expectedBuffer = Buffer.from(SIMULATED_BANK_SECRET);
        const signatureBuffer = Buffer.from(signature);

        if (expectedBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
            return res.status(401).json({ message: "Invalid signature" });
        }
    } catch {
        return res.status(401).json({ message: "Invalid signature" });
    }

    // 2. Validate Body payload with Zod
    const parsed = BankWebhookSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid payload format" });
    }

    const paymentInformation = parsed.data;

    try {
        // Prevent double processing by checking the status first
        const txn = await db.onRampTransaction.findUnique({
            where: { token: paymentInformation.token }
        });

        if (!txn || txn.status !== "Processing") {
            return res.status(400).json({ message: "Transaction already processed or not found" });
        }

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003, () => {
    console.log("Bank webhook server listening on port 3003");
});