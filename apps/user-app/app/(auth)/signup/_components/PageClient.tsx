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
import { signup } from "../../../lib/actions/signup";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpValues = z.infer<typeof signUpSchema>;

const PageClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpValues) => {
    setIsLoading(true);
    try {
      const signupRes = await signup(data.phone, data.password, data.name);
      if (!signupRes.success) {
        toast.error(signupRes.message);
        setIsLoading(false);
        return;
      }

      // Automatically sign in after creating account
      const response = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Account created, but failed to log in automatically.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-2">
          <div className="size-[34px] rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            P
          </div>
          <h1 className="text-[26px] font-ibm-plex-serif font-bold text-foreground">
            Paytm
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-2xl lg:text-4xl font-semibold text-foreground">
            Sign Up
          </h1>
          <p className="text-base font-normal text-muted-foreground">
            Create your account to get started
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <CustomInput
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
          />
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
          <CustomInput
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary font-semibold text-primary-foreground"
            >
              {isLoading ? (
                <React.Fragment>
                  <Loader2 size={20} className="animate-spin" />
                  &nbsp;Creating account...
                </React.Fragment>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-sm font-normal text-muted-foreground">
          Already have an account?
        </p>
        <Link href="/signin" className="text-sm cursor-pointer font-medium text-primary">
          Sign in
        </Link>
      </footer>
    </section>
  );
};

export { PageClient };
