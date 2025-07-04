"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface ForgotPasswordStepProps {
  onNext: () => void
  onUpdateData: (data: { email: string; userId: string }) => void
  initialEmail?: string
}

export default function ForgotPasswordStep({ onNext, onUpdateData, initialEmail = "" }: ForgotPasswordStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: initialEmail,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to send OTP")
      }

      // Update form data with email and userId (assuming API returns userId)
      onUpdateData({
        email: data.email,
        userId: result.userId || result.data?.userId || "",
      })

      onNext()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-l bg-[#eaf6ec]">
      <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)] h-[778px]">
        <div className="mx-auto">
          <div className="w-full p-10 h-[778px] flex flex-col items-center justify-center">
            <p className="mb-2 text-center text-gray-500">Step 1 of 3</p>

            <h1 className="mb-3 text-center text-3xl font-bold">Forgot Password</h1>

            <p className="mb-3 text-center text-gray-600">Enter your email to receive the OTP</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:w-[40%]">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded border border-gray-300 py-3 pl-4 pr-10 outline-none focus:border-green-500"
                  {...register("email")}
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <Mail size={20} />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded bg-green-500 py-3 font-medium text-white transition-colors hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
