"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


const formSchema = z.object({
    businessName: z.string().min(2, { message: "Business name must be at least 2 characters" }),
    goal: z.string().min(10, { message: "Goal must be at least 10 characters" }),
    about: z.string().min(30, { message: "About must be at least 10 characters" }),
})

type FormValues = z.infer<typeof formSchema>


export default function GrowContactForm() {

    const [isSubmitting, setIsSubmitting] = React.useState(false)


    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            goal: "",
            about: ""
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
        }, 2000)
        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-xl text-[#2F2F2F]'>Name</FormLabel>
                            <FormControl>
                                <Input className='text-base border-[#595959] rounded-sm h-16' placeholder="Input your business name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-xl text-[#2F2F2F]'>Goal</FormLabel>
                            <FormControl>
                                <Input className='text-base border-[#595959] rounded-sm h-16' placeholder="Input business gopal" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-xl text-[#2F2F2F]'>About</FormLabel>
                            <FormControl>
                                <Textarea className='text-base border-[#595959] rounded-sm h-52' placeholder="Input briefly about your project" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className='w-full bg-green-500 hover:bg-green-600 text-white h-11 sm:h-12 px-6 sm:px-8 text-base font-medium transition-colors'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>

            </form>
        </Form>
    )
}
