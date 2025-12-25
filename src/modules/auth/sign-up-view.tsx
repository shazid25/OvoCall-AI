"use client";

import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const fromSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Password confirmation is required" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const SignUpView = () => {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const from = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });

    const onSubmit = async (data: z.infer<typeof fromSchema>) => {
        setError(null);
        setPending(true);
        await authClient.signUp.email(
            { name: data.name, email: data.email, password: data.password },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                },
                onError: ({ error }) => {
                    setPending(false);
                    setError(error.message);
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...from}>
                        <form onSubmit={from.handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
                                <p className="text-muted-foreground text-balance">Create your account</p>
                            </div>

                            <div className="grid gap-4">
                                <FormField
                                    control={from.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={from.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl><Input type="email" placeholder="m@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={from.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl><Input type="password" placeholder="******" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={from.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl><Input type="password" placeholder="******" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle className="text-destructive text-xs">{error}</AlertTitle>
                                    </Alert>
                                )}

                                <Button disabled={pending} type="submit" className="w-full">Create Account</Button>

                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/sign-in" className="underline underline-offset-4">Sign in</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src="/logo.svg" alt="Logo" className="h-[92px] w-[92px]" />
                        <p className="text-2xl font-semibold text-white">OvoCall AI</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};