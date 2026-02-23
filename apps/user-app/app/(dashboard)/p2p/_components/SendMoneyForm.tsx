"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { p2pTransfer } from "@/app/lib/actions/p2pTransfer";
import { toast } from "sonner";

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

const sendSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  amount: z.string().min(1, "Amount is required").refine((val) => Number(val) > 0, "Amount must be positive"),
});

type SendValues = z.infer<typeof sendSchema>;

const SendMoneyForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SendValues>({
    resolver: zodResolver(sendSchema),
    defaultValues: { phone: "", amount: "" },
  });

  const onSubmit = async (data: SendValues) => {
    setIsLoading(true);
    try {
      const res = await p2pTransfer(data.phone, Number(data.amount));
      if (res.success) {
        toast.success(res.message);
        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-border w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-lg">Send Money</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="flex gap-3 pt-1">
                    {QUICK_AMOUNTS.map((amt) => (
                      <Button
                        key={amt}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => form.setValue("amount", String(amt))}
                      >
                        ₹{amt}
                      </Button>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <React.Fragment>
                  <Loader2 size={20} className="animate-spin" />
                  &nbsp;Sending...
                </React.Fragment>
              ) : (
                "Send Money"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { SendMoneyForm };
