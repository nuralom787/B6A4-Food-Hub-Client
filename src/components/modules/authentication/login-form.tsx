"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Minimum length is 8"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setLoading(true);
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
    if ((await data).data?.redirect) {
      return setLoading(false);
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);

      const loginPromise = async () => {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          setLoading(false);
          throw error;
        }

        return "User Login Successfully.";
      };

      toast.promise(loginPromise(), {
        pending: "Logging in...",
        success: {
          render({ data }) {
            setLoading(false);
            router.push("/");
            router.refresh();
            return `${data}`;
          },
        },
        error: {
          render({ data }: { data: any }) {
            setLoading(false);
            return data.message || "something went's wrong! please try again";
          },
        },
      });
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        {loading ?
          <Button type="button" disabled className="w-full">
            Loading
          </Button>
          :
          <Button form="login-form" type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        }
        {loading ?
          <Button type="button" disabled className="w-full">
            Loading
          </Button>
          :
          <Button
            onClick={() => handleGoogleLogin()}
            variant="outline"
            type="button"
            className="w-full cursor-pointer"
          >
            Continue with Google
          </Button>
        }
      </CardFooter>
    </Card>
  );
}
