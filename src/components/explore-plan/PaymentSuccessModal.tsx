"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useUserPayment } from "../context/paymentContext"
import { useEffect } from "react"

export default function PaymentSuccessModal({ open, onOpenChange, planType }: {
    open: boolean
    onOpenChange: (open: boolean) => void
    planType: string
}) {

    const { setPaymentType } = useUserPayment();

    useEffect(() => {
        setPaymentType(planType == "PREMIUM" ? "Premium" : "Ultimate")
    }, [setPaymentType, planType])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md text-center">
                <DialogHeader>
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <DialogTitle className="text-2xl font-bold">Payment Successful!</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-600 mt-2">
                    🎉 Your subscription is now active. Welcome aboard!
                </p>
                <DialogFooter className="mt-6 flex justify-center">
                    <Link href="/">
                        <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => onOpenChange(false)}>
                            Continue Exploring
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
