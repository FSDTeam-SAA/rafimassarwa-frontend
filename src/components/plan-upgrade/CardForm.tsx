"use client"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "next/image"

const formSchema = z.object({
    country: z.string().min(1, { message: "Country must be passed" }),
    email: z.string().email({ message: "Valid email is required" }),
    name: z.string().min(2, { message: "Name is required" }),
    cardNumber: z.string().min(8, { message: "Valid card number is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    cvc: z.string().min(1, { message: "This field is required" }),
    phone: z.string().min(10, { message: "Valid phone number is required" }),
})

export default function CardForm() {
    // Form definition
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: "us",
            email: "",
            cardNumber: "",
            date: "",
            cvc: "",
            phone: "",
        },
    })

    // Submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }


    const countryFlags = {
        us: "https://flagcdn.com/w20/us.png",
        ca: "https://flagcdn.com/w20/ca.png",
        uk: "https://flagcdn.com/w20/gb.png",
        au: "https://flagcdn.com/w20/au.png",
        de: "https://flagcdn.com/w20/de.png"
    }

    return (
        <div className="w-full max-w-3xl mx-auto md:mx-0">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h2 className="text-center text-[24px] font-semibold">Total: $359.00</h2>
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue="us">
                                        <SelectTrigger className="w-full mx-auto py-7 border border-black">
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Countries</SelectLabel>
                                                <SelectItem value="us" className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={countryFlags.us}
                                                            alt="USA flag"
                                                            width={20}
                                                            height={15}
                                                            className="object-cover rounded-sm"
                                                        />

                                                        <span>United States</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="ca" className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={countryFlags.ca}
                                                            alt="Canada flag"
                                                            width={20}
                                                            height={15}
                                                            className="object-cover rounded-sm"
                                                        />
                                                        <span>Canada</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="uk" className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={countryFlags.uk}
                                                            alt="UK flag"
                                                            width={20}
                                                            height={15}
                                                            className="object-cover rounded-sm"
                                                        />
                                                        <span>United Kingdom</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="au" className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={countryFlags.au}
                                                            alt="Australia flag"
                                                            width={20}
                                                            height={15}
                                                            className="object-cover rounded-sm"
                                                        />
                                                        <span>Australia</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="de" className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Image
                                                            src={countryFlags.de}
                                                            alt="Germany flag"
                                                            width={20}
                                                            height={15}
                                                            className="object-cover rounded-sm"
                                                        />
                                                        <span>Germany</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} className="py-7 border border-black focus:ring-0 outline-none" />
                                </FormControl>  
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-6">
                        <Image
                            src="/images/plan_upgrade_page/logo.png"
                            alt="card logo"
                            width={1000}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                        <Image
                            src="/images/plan_upgrade_page/mastercard.png"
                            alt="card logo"
                            width={1000}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                        <Image
                            src="/images/plan_upgrade_page/paypal.png"
                            alt="card logo"
                            width={1000}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                        <Image
                            src="/images/plan_upgrade_page/visa.png"
                            alt="card logo"
                            width={1000}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                        <Image
                            src="/images/plan_upgrade_page/american.png"
                            alt="card logo"
                            width={1000}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Name" {...field} className="py-7 border border-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Card Number" {...field} className="py-7 border border-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="date" placeholder="MM/DD/YY" {...field} className="py-7 border border-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="CVC" {...field} className="py-7 border border-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Phone Number" {...field} className="py-7 border border-black" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full text-center bg-[#28A745] py-7 text-[16px] font-medium">
                        Pay $359.00
                    </Button>
                </form>
            </Form>
        </div>
    )
}
