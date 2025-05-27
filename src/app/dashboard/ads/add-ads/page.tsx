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

interface AdsFormData {
  adsTitle: string;
  adsContent: string;
}

const Page = () => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);

  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdsFormData>();

  const { mutateAsync } = useMutation({
    mutationKey: ["add-ads"],
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/admin/ads/create-ads", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSave = async (data: AdsFormData) => {
    try {
      // Validate that at least one image is uploaded
      if (images.length === 0) {
        toast.error("Please upload at least one image for the ad");
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading("Creating ad...");

      // Create FormData object
      const formData = new FormData();
      formData.append("adsTitle", data.adsTitle);
      formData.append("adsContent", data.adsContent);

      // Append all images
      images.forEach((image) => {
        formData.append("imageLink", image.file);
      });

      // Submit the form
      await mutateAsync(formData);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Ad created successfully!");

      // Reset form and clear images
      reset();
      // Clear images and revoke URLs
      images.forEach((image) => URL.revokeObjectURL(image.preview));
      setImages([]);

      // Reset file input
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss();

      const errorMessage = "Failed to create ad. Please try again.";

      toast.error(errorMessage);
      console.error("Error creating ad:", error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />

        <button
          onClick={handleSubmit(handleSave)}
          disabled={isSubmitting}
          className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#218838] transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>

      <div>
        <div className="border border-[#b0b0b0] p-4 rounded-lg">
          <div>
            <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="adsTitle"
                  className="text-sm font-medium text-gray-700"
                >
                  Ads Title
                </label>
                <input
                  id="adsTitle"
                  {...register("adsTitle", {
                    required: "Ads title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message: "Title must not exceed 100 characters",
                    },
                  })}
                  placeholder="Enter Ads Title"
                  className={`border p-4 rounded-lg bg-inherit outline-none w-full focus:ring-2 focus:ring-[#28a745] focus:border-transparent transition-all ${
                    errors.adsTitle
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#b0b0b0]"
                  }`}
                />
                {errors.adsTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.adsTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="adsContent"
                  className="text-sm font-medium text-gray-700"
                >
                  Ads Description
                </label>
                <textarea
                  id="adsContent"
                  {...register("adsContent", {
                    required: "Ads description is required",
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Description must not exceed 1000 characters",
                    },
                  })}
                  placeholder="Type Description here..."
                  rows={4}
                  className={`border p-4 rounded-lg bg-inherit outline-none w-full resize-none focus:ring-2 focus:ring-[#28a745] focus:border-transparent transition-all ${
                    errors.adsContent
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#b0b0b0]"
                  }`}
                />
                {errors.adsContent && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.adsContent.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Ads Gallery <span className="text-red-500">*</span>
                </label>

                {images.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square relative rounded-md overflow-hidden border border-[#b0b0b0]">
                            <Image
                              src={image.preview || "/placeholder.svg"}
                              alt={`Preview ${index}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-90 hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}

                      <label
                        htmlFor="file-upload-more"
                        className="aspect-square flex items-center justify-center border-2 border-dashed border-[#b0b0b0] rounded-md cursor-pointer hover:border-[#28a745] hover:bg-green-50 transition-colors"
                      >
                        <div className="flex flex-col items-center space-y-1 text-gray-500">
                          <Upload className="h-8 w-8" />
                          <span className="text-xs">Add more</span>
                        </div>
                        <input
                          id="file-upload-more"
                          name="file-upload-more"
                          type="file"
                          className="sr-only"
                          accept="image/jpeg,image/png,image/jpg,image/webp"
                          onChange={handleImageUpload}
                          multiple
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">
                      {images.length} image{images.length !== 1 ? "s" : ""}{" "}
                      selected
                    </p>
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
                          <span>Drop your images here, or browse</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageUpload}
                            multiple
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-400">
                        JPEG, PNG, JPG, WebP are allowed
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#218838] transition-colors"
                >
                  {isSubmitting ? "Creating Ad..." : "Create Ad"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
