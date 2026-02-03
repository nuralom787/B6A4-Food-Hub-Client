"use client";

import { addAddress } from "@/app/actions/addAddressAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import * as z from "zod";


const formSchema = z.object({
    userId: z.string(),
    addressLine: z.string(),
    city: z.string(),
    area: z.string(),
});

const AddressForm = ({ ...props }) => {
    const { data: session } = authClient.useSession();

    const form = useForm({
        defaultValues: {
            userId: "",
            addressLine: "",
            city: "",
            area: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            value.userId = session?.user.id as string;
            // console.log("From Submit", value);

            const promise = addAddress(value);

            toast.promise(promise,
                {
                    pending: "Adding Address...",
                    success: "Successfully Added 🛒",
                    error: "somethings went Wrong! please try again ❌",
                }
            );

            promise.then((res) => {
                if (res?.success) {
                    redirect("/user/cart");
                }
            });
        },
    });


    return (
        <Card {...props}>
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
                            name="addressLine"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Address Details</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Address in details (street,holding,floor,etc)."
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="city"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>City</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="City"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="area"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Area</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Area with code"
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
                <Button form="login-form" type="submit" className="w-full cursor-pointer">
                    Add Address
                </Button>
            </CardFooter>
        </Card>
    );
};


export default AddressForm;