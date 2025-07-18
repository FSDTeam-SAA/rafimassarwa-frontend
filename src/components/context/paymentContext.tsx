"use client"

import { useSession } from "next-auth/react"
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { useQuery } from "@tanstack/react-query"

type PaymentType = "free" | "Premium" | "Ultimate" | null

interface PaymentContextType {
  paymentType: PaymentType
  isPaymentLoading: boolean
  setPaymentType: (type: PaymentType) => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const [paymentType, setPaymentType] = useState<PaymentType>("free")

  const { data, isLoading: isPaymentLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get-user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const json = await res.json()
      return json?.payment || "Free"
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  })

  // Sync local state when fetched data changes
  useEffect(() => {
    if (data) {
      setPaymentType(data)
    }
  }, [data])

  return (
    <PaymentContext.Provider value={{ paymentType, isPaymentLoading, setPaymentType }}>
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
