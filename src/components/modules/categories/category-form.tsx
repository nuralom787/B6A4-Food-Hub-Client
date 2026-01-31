"use client";

import { createCategory } from "@/app/actions/categoryAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
    name: z.string()
});

const CategoryForm = ({ ...props }) => {

    const form = useForm({
        defaultValues: {
            name: ""
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating category..");
            // console.log("From Submit", value);

            try {
                const res = await createCategory(value);

                if (!res.success) {
                    return toast.error("Category Creation Failed! Try Again.")
                };

                return toast.success("Category Created Successfully", { id: toastId });

            } catch (err) {
                toast.error("Something went wrong, please try again.", { id: toastId });
            }
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
                            name="name"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Please Type Category Name"
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
                    Add Category
                </Button>
            </CardFooter>
        </Card>
    );
};


export default CategoryForm;