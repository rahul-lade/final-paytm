import express from "express";
import db from "@repo/db/client";
import { BankWebhookSchema } from "@repo/validators";

const app = express();

app.use(express.json())

// Simulated secret that would normally be set by the bank in our dashboard
const SIMULATED_BANK_SECRET = process.env.BANK_WEBHOOK_SECRET || "simulate-bank-secret";

app.post("/hdfcWebhook", async (req, res) => {
    // 1. Verify Authentication/Signature
    const signature = req.headers["x-webhook-signature"];
    if (signature !== SIMULATED_BANK_SECRET) {
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