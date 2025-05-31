"use client";
import PathTracker from "../_components/PathTracker";
import type React from "react";

import { Pencil, Trash2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface News {
  _id: string;
  newsTitle: string;
  newsDescription: string;
  views: number;
  tickers: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface EditFormData {
  newsTitle: string;
  newsDescription: string;
  tickers: string;
}

const Page = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    newsTitle: "",
    newsDescription: "",
    tickers: "",
  });

  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const {
    data: allNews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allNews"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/admin/news/all-news");
        return res.data?.data || [];
      } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
      }
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      newsId,
      data,
    }: {
      newsId: string;
      data: EditFormData;
    }) => {
      const res = await axiosInstance.patch(`/admin/news/${newsId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("News updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
      setIsEditModalOpen(false);
      setSelectedNews(null);
    },
    onError: () => {
      toast.error("Failed to update news");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (newsId: string) => {
      const res = await axiosInstance.delete(
        `/admin/news/delete-news/${newsId}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("News deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
    },
    onError: () => {
      const errorMessage = "Failed to delete news";
      toast.error(errorMessage);
    },
  });

  // Calculate pagination
  const totalPages = Math.ceil(allNews.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allNews.slice(indexOfFirstPost, indexOfLastPost);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Truncate text function
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const { mutateAsync: deleteNews } = useMutation({
    mutationFn: async (newsId: string) => {
      const res = await axiosInstance.delete(`/admin/news/${newsId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("News deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["allNews"] });
    },
    onError: () => {
      const errorMessage = "Failed to delete news";
      toast.error(errorMessage);
    },
  });

  // Handle delete
  const handleDelete = async (newsId: string) => {
    try {
      await deleteNews(newsId);
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news");
    }
  };

  // Handle edit button click
  const handleEdit = (news: News) => {
    setSelectedNews(news);
    setEditFormData({
      newsTitle: news.newsTitle,
      newsDescription: news.newsDescription,
      tickers: news.tickers,
    });
    setIsEditModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (field: keyof EditFormData, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNews) return;

    if (
      !editFormData.newsTitle.trim() ||
      !editFormData.newsDescription.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await updateMutation.mutateAsync({
        newsId: selectedNews._id,
        data: editFormData,
      });
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedNews(null);
    setEditFormData({
      newsTitle: "",
      newsDescription: "",
      tickers: "",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">
          Error loading news:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }

  if (!allNews || allNews.length === 0) {
    return (
      <div>
        <div className="mb-8 flex items-center justify-between">
          <PathTracker />
          <Link href={"/dashboard/news/add-news"}>
            <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">
              + Add News
            </button>
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
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />

        <Link href={"/dashboard/news/add-news"}>
          <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">
            + Add News
          </button>
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
                    <div className="font-medium">
                      {truncateText(news.newsTitle, 50)}
                    </div>
                  </TableCell>
                  <TableCell className="border-none max-w-[250px]">
                    <div className="text-gray-600">
                      {truncateText(news.newsDescription, 60)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center border-none">
                    <span className="font-medium">
                      {news.views.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-center border-none">
                    {formatDate(news.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Edit news"
                        onClick={() => handleEdit(news)}
                      >
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
              Showing {indexOfFirstPost + 1}-
              {Math.min(indexOfLastPost, allNews.length)} of {allNews.length}{" "}
              news
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
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else {
                  if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                }

                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="icon"
                    className={`h-8 w-8 ${
                      currentPage === pageNumber
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled
                  >
                    ...
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(totalPages)}
                  >
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit News</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="newsTitle"
                  className="text-sm font-medium text-gray-700"
                >
                  News Title *
                </Label>
                <Input
                  id="newsTitle"
                  type="text"
                  value={editFormData.newsTitle}
                  onChange={(e) =>
                    handleInputChange("newsTitle", e.target.value)
                  }
                  placeholder="Enter news title"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="newsDescription"
                  className="text-sm font-medium text-gray-700"
                >
                  News Description *
                </Label>
                <Textarea
                  id="newsDescription"
                  value={editFormData.newsDescription}
                  onChange={(e) =>
                    handleInputChange("newsDescription", e.target.value)
                  }
                  placeholder="Enter news description"
                  className="w-full min-h-[120px] resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="tickers"
                  className="text-sm font-medium text-gray-700"
                >
                  Tickers
                </Label>
                <Input
                  id="tickers"
                  type="text"
                  value={editFormData.tickers}
                  onChange={(e) => handleInputChange("tickers", e.target.value)}
                  placeholder="Enter tickers (comma separated)"
                  className="w-full"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#28a745] hover:bg-[#218838] text-white"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Updating..." : "Update News"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
