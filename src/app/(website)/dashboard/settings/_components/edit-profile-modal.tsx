"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EditPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EditPasswordModal({ isOpen, onClose }: EditPasswordModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("All fields are required")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match")
      return
    }

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    // Simulate password change success
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      onClose()
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl">Change Password</DialogTitle>
              </DialogHeader>

              {success ? (
                <div className="py-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex flex-col items-center justify-center py-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-center">Password Changed Successfully</h3>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <DialogFooter className="pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                      Update Password
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
