"use client"
import PathTracker from "../_components/PathTracker"
import type React from "react"

import { Pencil, Trash2, X, Upload } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import useAxios from "@/hooks/useAxios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import dynamic from "next/dynamic"

// Dynamically import Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

interface Blog {
  _id: string
  blogTitle: string
  blogDescription: string
  imageLink?: string
  views: number
  createdAt: string
  updatedAt: string
  __v: number
}

interface EditFormData {
  blogTitle: string
  blogDescription: string
  imageLink?: string
}

const Page = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null)
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const axiosInstance = useAxios()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<EditFormData>({
    defaultValues: {
      blogTitle: "",
      blogDescription: "",
      imageLink: "",
    },
  })

  // Enhanced Quill modules configuration with Arabic/RTL support
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ direction: "rtl" }], // RTL/LTR direction toggle
      ["link", "image"],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
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
    "direction", // Add direction to formats
    "link",
    "image",
    "blockquote",
    "code-block",
    "script",
  ]

  const {
    data: blogsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/admin/blog/all-blog?page=${currentPage}&limit=${postsPerPage}`)
        return response.data
      } catch (error) {
        console.error("Error fetching blogs:", error)
        throw error
      }
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      blogId,
      data,
    }: {
      blogId: string
      data: FormData
    }) => {
      const res = await axiosInstance.patch(`/admin/blog/${blogId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return res.data
    },
    onSuccess: () => {
      toast.success(language === "ar" ? "تم تحديث المقال بنجاح!" : "Blog updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      closeModal()
    },
    onError: () => {
      toast.error(language === "ar" ? "فشل في تحديث المقال" : "Failed to update blog")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (blogId: string) => {
      const res = await axiosInstance.delete(`/admin/blog/${blogId}`)
      return res.data
    },
    onSuccess: () => {
      toast.success("Blog deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: () => {
      const errorMessage = "Failed to delete blog"
      toast.error(errorMessage)
    },
  })

  const blogs = blogsResponse?.data || []
  const meta = blogsResponse?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  }

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Truncate text function
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  // Handle delete
  const handleDelete = async (blogId: string) => {
    try {
      await deleteMutation.mutateAsync(blogId)
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast.error("Failed to delete blog")
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          language === "ar" ? "يجب أن يكون حجم الصورة أقل من 5 ميجابايت" : "Image size should be less than 5MB",
        )
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(language === "ar" ? "يرجى اختيار ملف صورة صالح" : "Please select a valid image file")
        return
      }

      const newImage = {
        file,
        preview: URL.createObjectURL(file),
      }

      // If there's already an image, revoke its URL to avoid memory leaks
      if (image) {
        URL.revokeObjectURL(image.preview)
      }

      setImage(newImage)
    }
  }

  const removeImage = () => {
    if (image) {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(image.preview)
      setImage(null)
    }
  }

  // Handle edit button click
  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog)
    setValue("blogTitle", blog.blogTitle)
    setValue("blogDescription", blog.blogDescription)
    setValue("imageLink", blog.imageLink || "")

    // Reset image state
    if (image) {
      URL.revokeObjectURL(image.preview)
      setImage(null)
    }

    setIsEditModalOpen(true)
  }

  // Custom validation for Quill content
  const validateQuillContent = (value: string) => {
    // Remove HTML tags to check actual text content
    const textContent = value.replace(/<[^>]*>/g, "").trim()
    if (!textContent) {
      return language === "ar" ? "وصف المقال مطلوب" : "Blog description is required"
    }
    if (textContent.length < 10) {
      return language === "ar"
        ? "يجب أن يكون الوصف 10 أحرف على الأقل"
        : "Description must be at least 10 characters long"
    }
    if (textContent.length > 2000) {
      return language === "ar" ? "يجب أن يكون الوصف أقل من 2000 حرف" : "Description must be less than 2000 characters"
    }
    return true
  }

  // Handle form submission
  const onSubmit = async (data: EditFormData) => {
    if (!selectedBlog) return

    try {
      // Create FormData to send both form fields and image file
      const formData = new FormData()
      formData.append("blogTitle", data.blogTitle)
      formData.append("blogDescription", data.blogDescription)

      // Add image if one is selected
      if (image) {
        formData.append("imageLink", image.file)
      }

      await updateMutation.mutateAsync({
        blogId: selectedBlog._id,
        data: formData,
      })
    } catch (error) {
      console.error("Error updating blog:", error)
      toast.error(language === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred")
    }
  }

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  // Close modal
  const closeModal = () => {
    setIsEditModalOpen(false)
    setSelectedBlog(null)
    reset()
    removeImage()
    setLanguage("en") // Reset language to English when closing modal
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading blogs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">
          Error loading blogs: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    )
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <div className="mb-8 flex items-center justify-between">
          <PathTracker />
          <Link href={"/dashboard/blogs/add-blogs"}>
            <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">+ Add Blogs</button>
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-lg text-gray-500 mb-4">No blogs available</div>
            <Link href={"/dashboard/blogs/add-blogs"}>
              <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">
                Create Your First Blog
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />

        <Link href={"/dashboard/blogs/add-blogs"}>
          <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">+ Add Blogs</button>
        </Link>
      </div>

      <div>
        <div className="rounded-lg overflow-hidden border border-[#b0b0b0]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#b0b0b0]">
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog: Blog) => (
                <TableRow key={blog._id} className="border-b border-[#b0b0b0]">
                  <TableCell className="border-none max-w-[200px]">
                    <div className="font-medium">{truncateText(blog.blogTitle, 50)}</div>
                  </TableCell>
                  <TableCell className="border-none max-w-[250px]">
                    <div className="text-gray-600">{truncateText(stripHtml(blog.blogDescription), 60)}</div>
                  </TableCell>
                  <TableCell className="text-center border-none">
                    <span className="font-medium">{blog.views.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="text-center border-none">{formatDate(blog.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="icon" title="Edit blog" onClick={() => handleEdit(blog)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete blog"
                        onClick={() => handleDelete(blog._id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm">
            <div>
              Showing {(currentPage - 1) * meta.limit + 1}-{Math.min(currentPage * meta.limit, meta.total)} of{" "}
              {meta.total} blogs
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </Button>

              {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                let pageNumber
                if (meta.totalPages <= 5) {
                  pageNumber = i + 1
                } else {
                  if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= meta.totalPages - 2) {
                    pageNumber = meta.totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }
                }

                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="icon"
                    className={`h-8 w-8 ${currentPage === pageNumber ? "bg-green-500 hover:bg-green-600" : ""}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                )
              })}

              {meta.totalPages > 5 && currentPage < meta.totalPages - 2 && (
                <>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    ...
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(meta.totalPages)}
                  >
                    {meta.totalPages}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === meta.totalPages}
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Edit Modal with Language Toggle */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {language === "ar" ? "تحرير المقال" : "Edit Blog"}
              </h2>
              <div className="flex items-center gap-3">
                {/* Language Toggle Button */}
                <div className="flex items-center gap-2 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-3 w-[100px] border border-green-500 rounded-md text-sm font-medium transition-colors ${
                      language === "en"
                        ? "bg-green-500 text-white font-medium shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("ar")}
                    className={`px-3 py-3 rounded-md text-sm w-[100px] border border-green-500 font-medium transition-colors ${
                      language === "ar"
                        ? "bg-green-500 text-white font-medium shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    العربية
                  </button>
                </div>

                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={updateMutation.isPending}
                  className="bg-[#28a745] hover:bg-[#218838] text-white py-3 px-5 rounded-lg"
                >
                  {updateMutation.isPending
                    ? language === "ar"
                      ? "جاري التحديث..."
                      : "Updating..."
                    : language === "ar"
                      ? "تحديث"
                      : "Update"}
                </button>
                <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Modal Body */}
            <div className={`p-6 ${language === "ar" ? "rtl" : "ltr"}`}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="blogTitle" className="text-sm font-medium text-gray-700">
                    {language === "ar" ? "عنوان المقال *" : "Blog Title *"}
                  </Label>
                  <Input
                    id="blogTitle"
                    placeholder={language === "ar" ? "أدخل عنوان المقال" : "Enter Blog Title"}
                    className={`border p-4 rounded-lg bg-inherit outline-none w-full ${
                      errors.blogTitle ? "border-red-500" : "border-[#b0b0b0]"
                    } ${language === "ar" ? "text-right" : "text-left"}`}
                    dir={language === "ar" ? "rtl" : "ltr"}
                    {...register("blogTitle", {
                      required: language === "ar" ? "عنوان المقال مطلوب" : "Blog title is required",
                      minLength: {
                        value: 3,
                        message:
                          language === "ar"
                            ? "يجب أن يكون العنوان 3 أحرف على الأقل"
                            : "Title must be at least 3 characters long",
                      },
                      maxLength: {
                        value: 100,
                        message:
                          language === "ar"
                            ? "يجب أن يكون العنوان أقل من 100 حرف"
                            : "Title must be less than 100 characters",
                      },
                    })}
                  />
                  {errors.blogTitle && <p className="text-red-500 text-sm">{errors.blogTitle.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blogDescription" className="text-sm font-medium text-gray-700">
                    {language === "ar" ? "وصف المقال *" : "Blog Description *"}
                  </Label>
                  <div className="mb-2 text-xs text-gray-500">
                    {language === "ar"
                      ? "💡 نصيحة: استخدم زر الاتجاه (⇄) في شريط الأدوات للتبديل بين اتجاه النص الإنجليزي والعربي"
                      : "💡 Tip: Use the direction button (⇄) in the toolbar to switch between English (LTR) and Arabic (RTL) text direction"}
                  </div>
                  <div
                    className={`border rounded-lg ${errors.blogDescription ? "border-red-500" : "border-[#b0b0b0]"}`}
                  >
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
                          placeholder={language === "ar" ? "اكتب الوصف هنا..." : "Type Description here..."}
                          style={{
                            backgroundColor: "inherit",
                          }}
                          className={`quill-editor arabic-support ${language === "ar" ? "rtl-mode" : "ltr-mode"}`}
                        />
                      )}
                    />
                  </div>
                  {errors.blogDescription && <p className="text-red-500 text-sm">{errors.blogDescription.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    {language === "ar" ? "صورة الغلاف" : "Cover Image"}
                  </Label>

                  {image ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <div className="w-48 h-48 relative rounded-md overflow-hidden border border-[#b0b0b0]">
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
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-90 hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        {image.file.name} ({(image.file.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="h-12 w-12 text-gray-400">
                          <Upload className="mx-auto h-12 w-12" />
                        </div>
                        <div className="flex text-sm text-gray-500">
                          <label htmlFor="file-upload" className="relative cursor-pointer">
                            <span>
                              {language === "ar" ? "اسحب الصورة هنا أو تصفح" : "Drop your image here, or browse"}
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/jpeg,image/png,image/jpg,image/webp"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-400">
                          {language === "ar"
                            ? "JPEG, PNG, JPG, WebP مسموح (حد أقصى 5 ميجابايت)"
                            : "JPEG, PNG, JPG, WebP are allowed (Max 5MB)"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .quill-editor .ql-editor {
          min-height: 300px;
          font-size: 14px;
          font-family: "Arial", "Tahoma", sans-serif;
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

        /* Arabic text support styles */
        .arabic-support .ql-editor {
          line-height: 1.8;
        }

        /* RTL direction support */
        .arabic-support .ql-editor[dir="rtl"] {
          text-align: right;
          direction: rtl;
        }

        .arabic-support .ql-editor[dir="ltr"] {
          text-align: left;
          direction: ltr;
        }

        /* Arabic font support */
        .arabic-support .ql-editor p,
        .arabic-support .ql-editor div,
        .arabic-support .ql-editor span {
          font-family: "Tahoma", "Arial Unicode MS", "Lucida Sans Unicode",
            sans-serif;
        }

        /* Direction button styling */
        .ql-direction .ql-picker-label::before {
          content: "⇄";
        }

        .ql-direction .ql-picker-item[data-value="rtl"]::before {
          content: "RTL";
        }

        .ql-direction .ql-picker-item[data-value="ltr"]::before {
          content: "LTR";
        }

        /* Better spacing for mixed content */
        .arabic-support .ql-editor p {
          margin-bottom: 0.5em;
        }

        /* Improved list styling for RTL */
        .arabic-support .ql-editor[dir="rtl"] ol,
        .arabic-support .ql-editor[dir="rtl"] ul {
          padding-right: 1.5em;
          padding-left: 0;
        }

        .arabic-support .ql-editor[dir="ltr"] ol,
        .arabic-support .ql-editor[dir="ltr"] ul {
          padding-left: 1.5em;
          padding-right: 0;
        }

        /* RTL support for form */
        .rtl {
          direction: rtl;
        }

        .ltr {
          direction: ltr;
        }

        /* RTL mode for Quill editor */
        .rtl-mode .ql-editor {
          direction: rtl;
          text-align: right;
        }

        .ltr-mode .ql-editor {
          direction: ltr;
          text-align: left;
        }

        /* Language toggle button styles */
        .language-toggle {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default Page
