"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

// ✅ Schema
const feedbackFormSchema = z.object({
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>

export default function FeedbackCard() {
  const { data: session } = useSession()
  const userEmail = session?.user?.email || ""

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      message: "",
    },
  })

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true)
    try {
      const payload = {
        message: data.message,
        email: userEmail,
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      toast.success("Feedback submitted successfully!")
      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-white rounded-lg border shadow-sm p-6 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold">Share Your Feedback</h2>
      </div>
      <p className="text-sm text-gray-500 mb-3">How can we improve your experience?</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="We'd love to hear your thoughts..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit feedback"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
