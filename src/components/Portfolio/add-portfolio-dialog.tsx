"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useUserPayment } from "../context/paymentContext";
import Link from "next/link";
import { Unlock } from "lucide-react";

// Zod schema for form validation
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

type FormData = z.infer<typeof formSchema>;

export function AddPortfolioDialog() {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false); // dialog open state

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const { data: portfolioData } = useQuery({
        queryKey: ["portfolio"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/get`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.accessToken}`,
                },
            })
            const data = await res.json()
            return data
        },
        enabled: !!session?.user?.accessToken,
    })

    const { paymentType } = useUserPayment()

    const { mutate: createPortfolio, isPending } = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protfolio/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.accessToken}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to create portfolio");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["portfolio"] });
            setOpen(false);
            toast.success("Portfolio created successfully!");
        },
    });

    function onSubmit(values: FormData) {
        createPortfolio(values);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="border rounded-md px-4 py-2 text-green-500 hover:bg-green-50 transition"
                    onClick={() => setOpen(true)}
                >
                    Add Portfolio
                </button>
            </DialogTrigger>
            {
                paymentType == "free" && portfolioData?.length == 1 ?
                    <DialogContent className="sm:max-w-[480px] p-6">
                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-lg font-semibold">
                                Add Portfolio
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Our free plan does not allow you to create multiple portfolios. <br />
                                Upgrade your plan to unlock this feature.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full text-white bg-green-600 flex items-center justify-center mb-4">
                                <Unlock size={32}/>
                            </div>
                            <p className="text-sm text-gray-600 max-w-xs">
                                To create more portfolios, please upgrade your subscription. Manage your investments with more flexibility.
                            </p>
                            <Link href="/explore-plan">
                                <Button
                                    className="border rounded-md px-4 py-2 bg-green-600 hover:bg-green-600 mt-5 transition"
                                >
                                    Upgrade Plan
                                </Button>
                            </Link>
                        </div>
                    </DialogContent>

                    :
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Portfolio</DialogTitle>
                            <DialogDescription>
                                Add a new portfolio by entering a name below.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. My Portfolio" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter className="pt-2">
                                    <DialogClose asChild>
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                                        {isPending ? "Creating..." : "Create"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
            }
        </Dialog>
    );
}
