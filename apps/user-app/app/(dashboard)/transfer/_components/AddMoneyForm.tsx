"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { createOnRampTransaction } from "@/app/lib/actions/createOnrampTransaction";
import { toast } from "sonner";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
  { name: "SBI", redirectUrl: "https://www.onlinesbi.sbi/" },
  { name: "ICICI Bank", redirectUrl: "https://www.icicibank.com/" },
];

const addMoneySchema = z.object({
  amount: z.string().min(1, "Amount is required").refine((val) => Number(val) > 0, "Amount must be positive"),
  bank: z.string().min(1, "Please select a bank"),
});

type AddMoneyValues = z.infer<typeof addMoneySchema>;

const AddMoneyForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddMoneyValues>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: { amount: "", bank: SUPPORTED_BANKS[0]?.name || "" },
  });

  const onSubmit = async (data: AddMoneyValues) => {
    setIsLoading(true);
    try {
      const res = await createOnRampTransaction(data.bank, Number(data.amount));
      if (res.success) {
        toast.success(res.message);
        const redirectUrl = SUPPORTED_BANKS.find((b) => b.name === data.bank)?.redirectUrl;
        if (redirectUrl) window.location.href = redirectUrl;
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
    <Card className="border border-border">
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Add Money to Wallet</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Bank</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SUPPORTED_BANKS.map((bank) => (
                        <SelectItem key={bank.name} value={bank.name}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <React.Fragment>
                  <Loader2 size={20} className="animate-spin" />
                  &nbsp;Processing...
                </React.Fragment>
              ) : (
                "Add Money"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { AddMoneyForm };
