"use client";

import { createBlogPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    tags: z.string()
});


const CreateBlogFromClient = () => {
    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: ""
        },
        validators: {
            onSubmit: blogSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating....");
            const blogData = {
                ...value,
                tags: value.tags.split(",").map(item => item.trim()).filter(item => item !== "")
            }

            console.log(blogData);

            try {
                //

                const res = await createBlogPost(blogData);

                if (res.error) {
                    toast.error(res.error.message, { id: toastId })
                    return
                }

                console.log(res);

            } catch (err) {
                console.log(err);
            }
        }
    });

    // const createBlog = async (formData: FormData) => {
    //     // "use server";

    //     const title = formData.get("title") as string;
    //     const content = formData.get("content") as string;
    //     const tags = formData.get("tags") as string;

    //     const blogData = {
    //         title,
    //         content,
    //         tags: tags.split(",").map(item => item.trim()).filter(item => item !== "")
    //     }

    //     // console.log(JSON.stringify(blogData));
    //     const cookieData = await cookies();


    //     const res = await fetch(`${API_URL}/posts`, {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //             Cookie: cookieData.toString()
    //         },
    //         body: JSON.stringify(blogData)
    //     });

    //     if (res.ok) {
    //         revalidateTag("blogPosts", "max")
    //         // updateTag("blogPosts");
    //     }
    // };

    return (
        <Card className="max-w-2xl mx-auto my-6">
            <CardHeader className="text-center">
                <CardTitle>Create Blog</CardTitle>
                <CardDescription>You Can Write Your Blog Here</CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="blog-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name="title"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor="title">Title</FieldLabel>
                                        <Input
                                            id="title"
                                            type="text"
                                            name="title"
                                            placeholder="Type Your Blog Title"
                                            required
                                        />
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="content"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor="content">Content</FieldLabel>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            placeholder="Type Your Content Here"
                                            required
                                        />
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="tags"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor="tags">Tags</FieldLabel>
                                        <Input
                                            id="tags"
                                            type="text"
                                            name="tags"
                                            placeholder="Input Tags Here. please separate every tag with an ','"
                                            required
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button form="blog-form" type="submit" className="w-full cursor-pointer">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CreateBlogFromClient;