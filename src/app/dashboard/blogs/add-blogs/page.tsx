"use client";
import PathTracker from "../../_components/PathTracker";

import type React from "react";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogFormData {
  blogTitle: string;
  blogDescription: string;
}

const Page = () => {
  const [image, setImage] = useState<{ file: File; preview: string } | null>(
    null
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP)");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Clean up previous image URL if exists
    if (image) {
      URL.revokeObjectURL(image.preview);
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setImage({
      file,
      preview: previewUrl,
    });

    console.log("Image selected:", {
      name: file.name,
      size: file.size,
      type: file.type,
      preview: previewUrl,
    });
  };

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image.preview);
      setImage(null);
    }
  };

  const axiosInstance = useAxios();

  const { mutateAsync } = useMutation({
    mutationKey: ["add-blog"],
    mutationFn: async (data: FormData) => {
      console.log("Sending FormData:", {
        blogTitle: data.get("blogTitle"),
        blogDescription: data.get("blogDescription"),
        image: data.get("image"),
      });

      const response = await axiosInstance.post(
        "/admin/blog/create-blog",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      // Validate that an image is uploaded
      if (!image) {
        toast.error("Please upload an image for the blog post");
        return;
      }

      // Create FormData object
      const formData = new FormData();

      // Append text fields
      formData.append("blogTitle", data.blogTitle);
      formData.append("blogDescription", data.blogDescription);

      // Append image file
      formData.append("imageLink", image.file);

      console.log("Form submission data:", {
        blogTitle: data.blogTitle,
        blogDescription: data.blogDescription,
        imageFile: image.file,
      });

      // Show loading toast
      const loadingToast = toast.loading("Creating blog post...");

      // Submit the form
      const result = await mutateAsync(formData);

      console.log("API Response:", result);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success(`Blog "${result.data.blogTitle}" created successfully!`);

      // Reset form and clear image
      reset();
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      setImage(null);
      router.push("/dashboard/blogs");
    } catch (error) {
      console.error("Error creating blog post:", error);

      // Show error toast with specific message if available
      const errorMessage = "Failed to create blog post. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>

      <div>
        <div className="border border-[#b0b0b0] p-4 rounded-lg">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Blog Title
                </label>
                <input
                  id="title"
                  {...register("blogTitle", {
                    required: "Blog title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                  })}
                  placeholder="Enter Blog Title"
                  className={`border border-[#b0b0b0] p-4 rounded-lg bg-inherit outline-none w-full ${
                    errors.blogTitle ? "border-red-500" : ""
                  }`}
                />
                {errors.blogTitle && (
                  <p className="text-red-500 text-sm">
                    {errors.blogTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Blog Description
                </label>
                <textarea
                  id="description"
                  {...register("blogDescription", {
                    required: "Blog description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                  })}
                  placeholder="Type Description here..."
                  rows={4}
                  className={`border border-[#b0b0b0] p-4 rounded-lg bg-inherit outline-none w-full resize-vertical ${
                    errors.blogDescription ? "border-red-500" : ""
                  }`}
                />
                {errors.blogDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.blogDescription.message}
                  </p>
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
                          width={500}
                          height={500}
                          className="w-full h-full object-cover"
                          onLoad={() =>
                            console.log("Image loaded successfully")
                          }
                          onError={(e) => {
                            console.error("Image failed to load:", e);
                            toast.error("Failed to load image preview");
                          }}
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
                        {image.file.name} (
                        {(image.file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center hover:border-gray-400 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="h-12 w-12 text-gray-400">
                        <Upload className="mx-auto h-12 w-12" />
                      </div>
                      <div className="flex text-sm text-gray-500">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500"
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
                      <p className="text-xs text-gray-400">
                        PNG, JPG, JPEG, WebP up to 5MB
                      </p>
                      <p className="text-xs text-red-400">
                        * Image is required
                      </p>
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
    </div>
  );
};

export default Page;
