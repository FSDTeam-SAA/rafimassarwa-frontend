"use client";

import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import PaymentSuccessModal from "../explore-plan/PaymentSuccessModal";
import PaymentFailureModal from "../explore-plan/PaymentFailureModal";

export default function CheckoutForm({ planType }: { planType: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);

    const queryClient = useQueryClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/payment-success",
            },
            redirect: "if_required",
        });

        if (error) {
            setShowFailureModal(true);
        } else if (paymentIntent?.status === "succeeded") {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/confirm-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paymentIntentId: paymentIntent.id,
                }),
            });
            queryClient.invalidateQueries({ queryKey: ["user"] });
            setShowSuccessModal(true);
        } else {
            setShowFailureModal(true);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto border p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Complete Your Payment</h2>
            <p className="mb-6 text-gray-600">
                Use a secure method to complete your transaction.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <PaymentElement />
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </form>

            <PaymentSuccessModal
                open={showSuccessModal}
                onOpenChange={setShowSuccessModal}
                planType={planType}
            />
            <PaymentFailureModal
                open={showFailureModal}
                onOpenChange={setShowFailureModal}
            />
        </div>
    );
}
