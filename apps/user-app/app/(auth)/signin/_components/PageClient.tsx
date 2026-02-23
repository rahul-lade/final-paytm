"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomInput } from "@/components/forms/CustomInput";
import { toast } from "sonner";

const signInSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

const PageClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Signed in successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex w-full max-w-sm flex-col justify-center gap-5 py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Sign In
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <CustomInput
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
          />
          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-1"
          >
            {isLoading ? (
              <React.Fragment>
                <Loader2 size={16} className="animate-spin" />
                &nbsp;Signing in...
              </React.Fragment>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?
        </p>
        <Link href="/signup" className="text-sm font-medium text-primary">
          Sign up
        </Link>
      </footer>
    </section>
  );
};

export { PageClient };
