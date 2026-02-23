"use client";

import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  type?: string;
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1.5">
          <FormLabel className="text-sm w-full max-w-[280px] font-medium text-foreground">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="rounded-lg border border-input text-foreground placeholder:text-muted-foreground"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-destructive mt-1" />
          </div>
        </FormItem>
      )}
    />
  );
};

export { CustomInput };
