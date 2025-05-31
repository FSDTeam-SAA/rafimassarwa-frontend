"use client"
import PathTracker from "../../_components/PathTracker"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import useAxios from "@/hooks/useAxios"
import { useMutation } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import Image from "next/image"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

// Dynamically import Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

interface BlogFormData {
  blogTitle: string
  blogDescription: string
}

const Page = () => {
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>()

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  }

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "blockquote",
    "code-block",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP)")
      return
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB")
      return
    }

    // Clean up previous image URL if exists
    if (image) {
      URL.revokeObjectURL(image.preview)
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)

    setImage({
      file,
      preview: previewUrl,
    })
  }

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image.preview)
      setImage(null)
    }
  }

  const axiosInstance = useAxios()

  const { mutateAsync } = useMutation({
    mutationKey: ["add-blog"],
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/admin/blog/create-blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    },
    onSuccess: (result) => {
      toast.success(`Blog "${result.data.blogTitle}" created successfully!`)
      reset()
      if (image) {
        URL.revokeObjectURL(image.preview)
      }
      setImage(null)
      router.push("/dashboard/blogs")
    },
    onError: (error) => {
      const errorMessage = "Failed to create blog post. Please try again."
      toast.error(errorMessage)
      console.error("Error creating blog post:", error)
    },
  })

  // Custom validation for Quill content
  const validateQuillContent = (value: string) => {
    // Remove HTML tags to check actual text content
    const textContent = value.replace(/<[^>]*>/g, "").trim()
    if (!textContent) {
      return "Blog description is required"
    }
    if (textContent.length < 10) {
      return "Description must be at least 10 characters long"
    }
    if (textContent.length > 5000) {
      return "Description must be less than 5000 characters"
    }
    return true
  }

  const onSubmit = async (data: BlogFormData) => {
    try {
      // Validate that an image is uploaded
      if (!image) {
        toast.error("Please upload an image for the blog post")
        return
      }

      // Create FormData object
      const formData = new FormData()

      // Append text fields
      formData.append("blogTitle", data.blogTitle)
      formData.append("blogDescription", data.blogDescription)

      // Append image file
      formData.append("imageLink", image.file)

      // Show loading toast
      const loadingToast = toast.loading("Creating blog post...")

      // Submit the form
      await mutateAsync(formData)

      // Dismiss loading toast
      toast.dismiss(loadingToast)
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss()
      console.error("Error creating blog post:", error)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#218838] transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>

      <div>
        <div className="border border-[#b0b0b0] p-4 rounded-lg">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  {...register("blogTitle", {
                    required: "Blog title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message: "Title must not exceed 100 characters",
                    },
                  })}
                  placeholder="Enter Blog Title"
                  className={`border p-4 rounded-lg bg-inherit outline-none w-full focus:ring-2 focus:ring-[#28a745] focus:border-transparent transition-all ${
                    errors.blogTitle ? "border-red-500 focus:ring-red-500" : "border-[#b0b0b0]"
                  }`}
                />
                {errors.blogTitle && <p className="text-red-500 text-sm mt-1">{errors.blogTitle.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Blog Description <span className="text-red-500">*</span>
                </label>
                <div className={`border rounded-lg ${errors.blogDescription ? "border-red-500" : "border-[#b0b0b0]"}`}>
                  <Controller
                    name="blogDescription"
                    control={control}
                    rules={{
                      validate: validateQuillContent,
                    }}
                    render={({ field }) => (
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        formats={formats}
                        placeholder="Type Description here..."
                        style={{
                          backgroundColor: "inherit",
                        }}
                        className="quill-editor"
                      />
                    )}
                  />
                </div>
                {errors.blogDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.blogDescription.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Blog Image <span className="text-red-500">*</span>
                </label>

                {image ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <div className="w-full max-w-md h-64 relative rounded-md overflow-hidden border border-[#b0b0b0] bg-gray-100">
                        <Image
                          src={image.preview || "/placeholder.svg"}
                          alt="Blog preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-90 hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor="file-upload-replace"
                        className="inline-flex items-center px-4 py-2 border border-[#b0b0b0] rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Replace Image
                        <input
                          id="file-upload-replace"
                          name="file-upload-replace"
                          type="file"
                          className="sr-only"
                          accept="image/jpeg,image/png,image/jpg,image/webp"
                          onChange={handleImageUpload}
                        />
                      </label>

                      <div className="text-sm text-gray-500">
                        {image.file.name} ({(image.file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center hover:border-[#28a745] hover:bg-green-50 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="h-12 w-12 text-gray-400">
                        <Upload className="mx-auto h-12 w-12" />
                      </div>
                      <div className="flex text-sm text-gray-500">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer font-medium text-[#28a745] hover:text-[#218838]"
                        >
                          <span>Click to upload</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <span className="ml-1">or drag and drop</span>
                      </div>
                      <p className="text-xs text-gray-400">PNG, JPG, JPEG, WebP up to 5MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden submit button for form submission */}
              <button type="submit" className="hidden" />
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .quill-editor .ql-editor {
          min-height: 400px;
          font-size: 14px;
        }

        .quill-editor .ql-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom: 1px solid #b0b0b0;
        }

        .quill-editor .ql-container {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        .quill-editor .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
        }
      `}</style>
    </div>
  )
}

export default Page
