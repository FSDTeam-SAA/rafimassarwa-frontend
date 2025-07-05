"use client"

import { useSession } from "next-auth/react"
import {
  createContext,
  useContext,
  ReactNode,
} from "react"
import { useQuery } from "@tanstack/react-query"

type PaymentType = "Free" | "Premium" | "Ultimate" | null

interface PaymentContextType {
  paymentType: PaymentType
  isPaymentLoading: boolean
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const { data: paymentType = "Free", isLoading: isPaymentLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get-user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const json = await res.json()
      return json?.payment || "Free"
    },
    select: (data) => data?.payment || "Free",
    enabled: !!userId, 
    staleTime: 5 * 60 * 1000,
  })

  return (
    <PaymentContext.Provider value={{ paymentType, isPaymentLoading }}>
      {children}
    </PaymentContext.Provider>
  )
}

export const useUserPayment = () => {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error("useUserPayment must be used within a PaymentProvider")
  }
  return context
}
