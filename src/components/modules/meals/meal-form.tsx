"use client";

import { getCategories } from "@/app/actions/categoryAction";
import { createMeals } from "@/app/actions/mealsAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
    title: z.string().min(5, "The value must be gether then 5"),
    description: z.string().min(20, "The value must be gether then 20"),
    price: z.number().min(1, ""),
    imageUrl: z.url().min(1, ""),
    categoryId: z.string().min(1, ""),
    providerId: z.string(),
});

const MealForm = ({ ...props }) => {
    const { userData } = props;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCat = async () => {
            const data = await getCategories();
            setCategories(data.data)
        };
        loadCat();
    }, [])

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            imageUrl: "",
            categoryId: "",
            providerId: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating Meal..");
            value.providerId = userData.providerProfile.id;

            try {
                const res = await createMeals(value);

                if (!res.success) {
                    return toast.error("Meals Creation Failed! Try Again.", { id: toastId })
                };

                return toast.success("Meals Created Successfully", { id: toastId });
            }
            catch (err) {
                // return toast.error("Something went wrong, please try again.", { id: toastId });
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
                            name="title"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Input Title"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="description"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Type your message here."
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="price"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                                        <Input
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            placeholder="Input Price"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="imageUrl"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Image Url</FieldLabel>
                                        <Input
                                            type="url"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="Input Image Url"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <form.Field
                            name="categoryId"
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Select Category</FieldLabel>
                                        <select
                                            id={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="border border-gray-500 p-2 rounded-md dark:text-gray-700"
                                        >
                                            <option value="">Select Category</option>
                                            {
                                                categories.map((category: { id: string, name: string }, idx) =>
                                                    <option value={category.id} key={idx}>
                                                        {category.name}
                                                    </option>)
                                            }
                                        </select>
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
                    Add Meal
                </Button>
            </CardFooter>
        </Card>
    );
};


export default MealForm;