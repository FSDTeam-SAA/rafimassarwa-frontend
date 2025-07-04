"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"

export default function FeedbackCard() {
  return (
    <div className="w-full bg-white rounded-lg border shadow-sm p-6 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold">Share Your Feedback</h2>
      </div>
      <p className="text-sm text-gray-500 mb-3">How can we improve your experience?</p>
      <Textarea placeholder="We'd love to hear your thoughts..." className="min-h-[100px] mb-4" />
      <div className="flex justify-end">
        <Button className="bg-green-600 hover:bg-green-700">Submit feedback</Button>
      </div>
    </div>
  )
}
