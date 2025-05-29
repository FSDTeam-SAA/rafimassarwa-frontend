"use client";
import React from "react";
import PathTracker from "../_components/PathTracker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  stockName: z.string().min(1, "Stock name is required"),
  financialHealth: z.string().min(1, "Please select financial health"),
  competitiveAdvantage: z
    .string()
    .min(1, "Please select competitive advantage"),
  fairValue: z.string().min(1, "Fair value is required"),
});

type FormData = z.infer<typeof formSchema>;

const Page = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockName: "",
      financialHealth: "",
      competitiveAdvantage: "",
      fairValue: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />

        <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold hover:bg-[#218838] transition-colors">
          Save
        </button>
      </div>

      <div className="border border-gray-300 p-4 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="stockName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Stock Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white border-gray-300 rounded-md h-12 text-gray-900 placeholder:text-gray-500 bg-inherit"
                      placeholder="Enter Stock Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financialHealth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Financial Health
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl                    >
                      <SelectTrigger className="bg-white border-gray-300 rounded-md h-12 text-gray-900 placeholder:text-gray-500 bg-inherit">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="competitiveAdvantage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Competitive Advantage
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white border-gray-300 rounded-md h-12 text-gray-900 placeholder:text-gray-500 bg-inherit">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="strong">Strong</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="weak">Weak</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fairValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Fair Value
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white border-gray-300 rounded-md h-12 text-gray-900 placeholder:text-gray-500 bg-inherit"
                      placeholder="Enter Fair Value"
                      type="number"
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
