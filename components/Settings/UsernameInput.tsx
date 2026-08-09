"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { userNameSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { startTransition } from "react";
import { updateUserName } from "@/app/actions/updateUserName";

type UsernameFormValues = z.infer<typeof userNameSchema>;

export type Props = {
  userName: string;
};

export default function UsernameInput({ userName }: Props) {
  const form = useForm<UsernameFormValues>({
    resolver: zodResolver(userNameSchema),
    defaultValues: { userName },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    startTransition(async () => {
      await updateUserName(data.userName);
    });
  });

  return (
    <div className="flex w-full md:w-1/2 items-start gap-4">
      <div className="flex flex-col gap-1 w-full justify-center">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 w-full space-y-4"
        >
          <Controller
            name="userName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name" className="text-sm font-medium">
                  Username
                </FieldLabel>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col xs:flex-row gap-3 xs:items-center">
                    <Input
                      id="name"
                      placeholder="Enter a username"
                      className="w-full truncate"
                      {...field}
                    />
                    <Button
                      type="submit"
                      className="w-full xs:w-auto shrink-0 cursor-pointer"
                      disabled={
                        form.formState.isSubmitting || !form.formState.isDirty
                      }
                    >
                      Save
                    </Button>
                  </div>
                  <p className="text-sm text-red-500 min-h-5 leading-tight ">
                    {fieldState.error?.message}
                  </p>
                </div>
              </Field>
            )}
          />
        </form>
      </div>
    </div>
  );
}
