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

interface News {
  _id: string
  newsTitle: string
  newsDescription: string
  imageLink: string
  views: number
  tickers: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface EditFormData {
  newsTitle: string
  newsDescription: string
  imageLink: string
  tickers: string
}

const Page = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState<News | null>(null)
  const [image, setImage] = useState<{ file: File; preview: string } | null>(null)

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
      newsTitle: "",
      newsDescription: "",
      imageLink: "",
      tickers: "",
    },
  })

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

  const {
    data: allNews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allNews"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/admin/news/all-news")
        return res.data?.data || []
      } catch (error) {
        console.error("Error fetching news:", error)
        throw error
      }
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      newsId,
      data,
    }: {
      newsId: string
      data: EditFormData
    }) => {
      const res = await axiosInstance.patch(`/admin/news/${newsId}`, data)
      return res.data
    },
    onSuccess: () => {
      toast.success("News updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["allNews"] })
      closeModal()
    },
    onError: () => {
      toast.error("Failed to update news")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (newsId: string) => {
      const res = await axiosInstance.delete(`/admin/news/${newsId}`)
      return res.data
    },
    onSuccess: () => {
      toast.success("News deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["allNews"] })
    },
    onError: () => {
      const errorMessage = "Failed to delete news"
      toast.error(errorMessage)
    },
  })

  // Calculate pagination
  const totalPages = Math.ceil(allNews.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = allNews.slice(indexOfFirstPost, indexOfLastPost)

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
  const handleDelete = async (newsId: string) => {
    try {
      await deleteMutation.mutateAsync(newsId)
    } catch (error) {
      console.error("Error deleting news:", error)
      toast.error("Failed to delete news")
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file")
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
  const handleEdit = (news: News) => {
    setSelectedNews(news)
    setValue("newsTitle", news.newsTitle)
    setValue("newsDescription", news.newsDescription)
    setValue("imageLink", news.imageLink || "")
    setValue("tickers", news.tickers || "")

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
      return "News description is required"
    }
    if (textContent.length < 10) {
      return "Description must be at least 10 characters long"
    }
    if (textContent.length > 1000) {
      return "Description must be less than 1000 characters"
    }
    return true
  }

  // Handle form submission
  const onSubmit = async (data: EditFormData) => {
    if (!selectedNews) return

    try {
      const payload = {
        newsTitle: data.newsTitle,
        newsDescription: data.newsDescription,
        imageLink: data.imageLink,
        tickers: data.tickers,
      }

      await updateMutation.mutateAsync({
        newsId: selectedNews._id,
        data: payload,
      })
    } catch (error) {
      console.error("Error updating news:", error)
      toast.error("An unexpected error occurred")
    }
  }

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  // Close modal
  const closeModal = () => {
    setIsEditModalOpen(false)
    setSelectedNews(null)
    reset()
    removeImage()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading news...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">
          Error loading news: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    )
  }

  if (!allNews || allNews.length === 0) {
    return (
      <div>
        <div className="mb-8 flex items-center justify-between">
          <PathTracker />
          <Link href={"/dashboard/news/add-news"}>
            <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">+ Add News</button>
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-lg text-gray-500 mb-4">No news available</div>
            <Link href={"/dashboard/news/add-news"}>
              <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">
                Create Your First News
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

        <Link href={"/dashboard/news/add-news"}>
          <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">+ Add News</button>
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
              {currentPosts.map((news: News) => (
                <TableRow key={news._id} className="border-b border-[#b0b0b0]">
                  <TableCell className="border-none max-w-[200px]">
                    <div className="font-medium">{truncateText(news.newsTitle, 50)}</div>
                  </TableCell>
                  <TableCell className="border-none max-w-[250px]">
                    <div className="text-gray-600">{truncateText(stripHtml(news.newsDescription), 60)}</div>
                  </TableCell>
                  <TableCell className="text-center border-none">
                    <span className="font-medium">{news.views.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="text-center border-none">{formatDate(news.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="icon" title="Edit news" onClick={() => handleEdit(news)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete news"
                        onClick={() => handleDelete(news._id)}
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
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm">
            <div>
              Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, allNews.length)} of {allNews.length} news
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

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber
                if (totalPages <= 5) {
                  pageNumber = i + 1
                } else {
                  if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
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

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    ...
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit News</h2>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={updateMutation.isPending}
                  className="bg-[#28a745] hover:bg-[#218838] text-white"
                >
                  {updateMutation.isPending ? "Updating..." : "Update"}
                </Button>
                <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newsTitle" className="text-sm font-medium text-gray-700">
                    News Title *
                  </Label>
                  <Input
                    id="newsTitle"
                    placeholder="Enter News Title"
                    className={`border p-4 rounded-lg bg-inherit outline-none w-full ${
                      errors.newsTitle ? "border-red-500" : "border-[#b0b0b0]"
                    }`}
                    {...register("newsTitle", {
                      required: "News title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters long",
                      },
                      maxLength: {
                        value: 100,
                        message: "Title must be less than 100 characters",
                      },
                    })}
                  />
                  {errors.newsTitle && <p className="text-red-500 text-sm">{errors.newsTitle.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newsDescription" className="text-sm font-medium text-gray-700">
                    News Description *
                  </Label>
                  <div
                    className={`border rounded-lg ${errors.newsDescription ? "border-red-500" : "border-[#b0b0b0]"}`}
                  >
                    <Controller
                      name="newsDescription"
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
                  {errors.newsDescription && <p className="text-red-500 text-sm">{errors.newsDescription.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Cover Image</Label>

                  {image ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <div className="w-48 h-48 relative rounded-md overflow-hidden border border-[#b0b0b0]">
                          <Image
                            src={image.preview || "/placeholder.svg"}
                            alt="News preview"
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
                            <span>Drop your image here, or browse</span>
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
                        <p className="text-xs text-gray-400">JPEG, PNG, JPG, WebP are allowed (Max 5MB)</p>
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
