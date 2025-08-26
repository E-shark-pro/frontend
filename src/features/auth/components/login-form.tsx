
"use client"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "../schemas/login.shema";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldType } from "@/types/formFields.type";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useLoginMutation } from "../services/api/login.api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../services/features/login.slice";
import { useRouter } from "next/navigation";

const fields: FormFieldType[] = [
    {
        name: "email",
        label: "Email",
        type: "text",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
    },
];
export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [login, { data: loginData, isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(formData: z.infer<typeof loginFormSchema>) {
        console.log(loginData, "login data");
        console.log(error, "error");
        console.log(formData, "form data");
        login(formData)
            .unwrap()
            .then((res) => {
                console.log("Login success:", res);
                dispatch(setCredentials({ user: res.user, token: res.token }));
                toast.success("Login successful");
                router.push("/");
            })
            .catch((err) => {
                console.log("Login failed:", err);

                // Type-safe check for error with .data
                if ("data" in err && err.data && typeof err.data === "object") {


                    toast.error("Login failed", {
                        description: (
                            <pre className="mt-2 rounded-md bg-slate-950 p-4">
                                <code className="text-white">{err.data.error as any}</code>
                            </pre>
                        ),
                    });
                } else {
                    toast("Login failed", {
                        description: "Something went wrong. Please try again.",
                    });
                }
            });
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome back</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your Lloyds Egypt account
                                    </p>
                                </div>
                                {fields.map((fieldItem) => (
                                    <div className="grid gap-3" key={fieldItem.name}>
                                        <FormField
                                            control={form.control}
                                            name={fieldItem.name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{fieldItem.label}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={fieldItem.label}
                                                            type={fieldItem.type}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        {fieldItem.description}
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}

                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-muted relative hidden md:block p-20 ">
                        <Image
                            src="/images/lloyds-logo.png"
                            width={400}
                            height={400}
                            alt="Image"
                            className="absolute  bg-white inset-0 h-full w-full object-contain dark:brightness-[0.8] "
                        />
                    </div>
                </CardContent>
            </Card>
            {/*<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">*/}
            {/*  By clicking Login, you agree to our <a href="#">Terms of Service</a> and{" "}*/}
            {/*  <a href="#">Privacy Policy</a>.*/}
            {/*</div>*/}
        </div>
    );
}
