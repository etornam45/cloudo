"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { redirect, useRouter } from "next/navigation";
import { logggedInUserAtom } from "@/lib/store.jotai";
import { useAtom } from "jotai";
import { UserI } from "@/lib/prisma";


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})



export default function Page() {
    const [user, setUser] = useAtom(logggedInUserAtom)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    const [loading, setLoading] = useState(false)

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) {
                    toast("Failed to login.", {
                        description: "Please check your email and password.",
                        dismissible: true,
                        icon: <Cross1Icon color="red" />,
                    })
                    throw new Error("Failed to login.")
                }
                setLoading(false)
                toast("Logged in successfully.", {
                    description: "You have successfully logged in.",
                    icon: <CheckIcon color="green" />,
                })
                setUser(res.json() as unknown as UserI)

                console.log("Logged in successfully. Redirecting to '/'.")
                router.push("/")
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[250px]">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your email address.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your private password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={loading} type="submit">{
                    loading ? "Loading..." : "Login"
                }</Button>
            </form>
        </Form>
    )
}