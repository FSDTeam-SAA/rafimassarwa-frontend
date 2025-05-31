"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PathTracker from "../../_components/PathTracker";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface VideoFormData {
  videoTitle: string;
  videoLink: string;
}

const Page = () => {
  const axiosInstance = useAxios();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoFormData>();

  const { mutateAsync } = useMutation({
    mutationKey: ["addYoutubeVideo"],
    mutationFn: async (data: VideoFormData) => {
      const response = await axiosInstance.post(
        "/admin/youtubeVideos/create",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast("YouTube video added successfully!");
      router.push("/dashboard/youtube-video");
    }
  });

  const handleAddVideo = async (data: VideoFormData) => {
    try {
      setLoading(true);
      await mutateAsync(data);
    } catch (error) {

      const errorMessage =
        "Failed to add YouTube video. Please try again.";

      toast.error(errorMessage);
      console.error("Error adding YouTube video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />

        <button
          onClick={handleSubmit(handleAddVideo)}
          disabled={loading}
          className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#218838] transition-colors"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      <form onSubmit={handleSubmit(handleAddVideo)}>
        <div className="border border-[#b0b0b0] p-4 rounded-lg">
          <div>
            <h1 className="text-lg font-medium mb-2">YouTube Video Title</h1>
            <input
              type="text"
              {...register("videoTitle", {
                required: "Video title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters long",
                },
                maxLength: {
                  value: 100,
                  message: "Title must not exceed 100 characters",
                },
              })}
              className={`w-full mt-1 h-[51px] border rounded-lg bg-inherit outline-none px-3 focus:ring-2 focus:ring-[#28a745] focus:border-transparent transition-all ${
                errors.videoTitle
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#b0b0b0]"
              }`}
              placeholder="Enter YouTube Video Title"
            />
            {errors.videoTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.videoTitle.message}
              </p>
            )}
          </div>

          <div className="mt-8">
            <h1 className="text-lg font-medium mb-2">YouTube Video Link</h1>
            <input
              type="url"
              {...register("videoLink", {
                required: "Video link is required",
              })}
              className={`w-full mt-1 h-[51px] border rounded-lg bg-inherit outline-none px-3 focus:ring-2 focus:ring-[#28a745] focus:border-transparent transition-all ${
                errors.videoLink
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#b0b0b0]"
              }`}
              placeholder="Enter YouTube Video Link (e.g., https://www.youtube.com/watch?v=...)"
            />
            {errors.videoLink && (
              <p className="text-red-500 text-sm mt-1">
                {errors.videoLink.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#218838] transition-colors"
            >
              {loading ? "Saving..." : "Save Video"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
