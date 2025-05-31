"use client";
import PathTracker from "../../_components/PathTracker";

import type React from "react";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NewsFormData {
  newsTitle: string;
  newsDescription: string;
  tickers: string;
  imageLink: string;
}

const Page = () => {

  const router = useRouter();

  const [image, setImage] = useState<{ file: File; preview: string } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsFormData>({
    defaultValues: {
      newsTitle: "",
      newsDescription: "",
      tickers: "",
      imageLink: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      const newImage = {
        file,
        preview: URL.createObjectURL(file),
      };

      // If there's already an image, revoke its URL to avoid memory leaks
      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      setImage(newImage);
    }
  };

  const removeImage = () => {
    if (image) {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(image.preview);
      setImage(null);
    }
  };

  const axiosInstance = useAxios();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-news"],
    mutationFn: async (payload: NewsFormData) => {
      const res = await axiosInstance.post("/admin/news/create-news", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("News created successfully!");
      reset();
      removeImage();
      router.push("/dashboard/news");
    },
    onError: (error: import("axios").AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message || "Failed to create news";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: NewsFormData) => {
    try {
      const payload = {
        newsTitle: data.newsTitle,
        newsDescription: data.newsDescription,
        tickers: data.tickers,
        imageLink: image?.preview || data.imageLink,
      };

      await mutateAsync(payload);
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
          className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>

      <div>
        <div className="border border-[#b0b0b0] p-4 rounded-lg">
          <div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label
                  htmlFor="newsTitle"
                  className="text-sm font-medium text-gray-700"
                >
                  News Title *
                </label>
                <input
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
                {errors.newsTitle && (
                  <p className="text-red-500 text-sm">
                    {errors.newsTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="newsDescription"
                  className="text-sm font-medium text-gray-700"
                >
                  News Description *
                </label>
                <textarea
                  id="newsDescription"
                  placeholder="Type Description here..."
                  rows={4}
                  className={`border p-4 rounded-lg bg-inherit outline-none w-full resize-vertical ${
                    errors.newsDescription
                      ? "border-red-500"
                      : "border-[#b0b0b0]"
                  }`}
                  {...register("newsDescription", {
                    required: "News description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Description must be less than 1000 characters",
                    },
                  })}
                />
                {errors.newsDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.newsDescription.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tickers"
                  className="text-sm font-medium text-gray-700"
                >
                  Tickers *
                </label>
                <input
                  id="tickers"
                  placeholder="Enter tickers (e.g., AAPL, GOOGL, MSFT)"
                  className={`border p-4 rounded-lg bg-inherit outline-none w-full ${
                    errors.tickers ? "border-red-500" : "border-[#b0b0b0]"
                  }`}
                  {...register("tickers", {
                    required: "Tickers are required",
                    minLength: {
                      value: 1,
                      message: "At least one ticker is required",
                    },
                  })}
                />
                {errors.tickers && (
                  <p className="text-red-500 text-sm">
                    {errors.tickers.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="imageLink"
                  className="text-sm font-medium text-gray-700"
                >
                  Image Link (Optional)
                </label>
                <input
                  id="imageLink"
                  placeholder="Enter image URL or upload an image above"
                  className="border border-[#b0b0b0] p-4 rounded-lg bg-inherit outline-none w-full"
                  {...register("imageLink")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  News Image *
                </label>

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
                      {image.file.name} (
                      {(image.file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="h-12 w-12 text-gray-400">
                        <Upload className="mx-auto h-12 w-12" />
                      </div>
                      <div className="flex text-sm text-gray-500">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer"
                        >
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
                      <p className="text-xs text-gray-400">
                        JPEG, PNG, JPG, WebP are allowed (Max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
