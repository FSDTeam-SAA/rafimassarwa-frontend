"use client";
import PathTracker from "../_components/PathTracker";

import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

interface Blog {
  _id: string;
  blogTitle: string;
  blogDescription: string;
  imageLink?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface EditFormData {
  blogTitle: string;
  blogDescription: string;
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const form = useForm<EditFormData>({
    defaultValues: {
      blogTitle: "",
      blogDescription: "",
    },
  });

  const {
    data: blogsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/blog/all-blog?page=${currentPage}&limit=10`
      );
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (blogId: string) => {
      await axiosInstance.delete(`/admin/blog/${blogId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDeleteModalOpen(false);
      setSelectedBlog(null);
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      blogId,
      data,
    }: {
      blogId: string;
      data: EditFormData;
    }) => {
      await axiosInstance.patch(`/admin/blog/${blogId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setEditModalOpen(false);
      setSelectedBlog(null);
      form.reset();
      toast({
        title: "Success",
        description: "Blog updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog",
        variant: "destructive",
      });
    },
  });

  const blogs = blogsResponse?.data || [];
  const meta = blogsResponse?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  const handleDelete = (blog: Blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    form.setValue("blogTitle", blog.blogTitle);
    form.setValue("blogDescription", blog.blogDescription);
    setEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBlog) {
      deleteMutation.mutate(selectedBlog._id);
    }
  };

  const onSubmitEdit = (data: EditFormData) => {
    if (selectedBlog) {
      updateMutation.mutate({ blogId: selectedBlog._id, data });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Error loading blogs</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <PathTracker />
        <Link href={"/dashboard/blogs/add-blogs"}>
          <button className="bg-[#28a745] py-2 px-5 rounded-lg text-white font-semibold">
            + Add Blogs
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
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog: Blog) => (
                <TableRow key={blog._id} className="border-b border-[#b0b0b0]">
                  <TableCell className="border-none max-w-xs">
                    <div className="truncate" title={blog.blogTitle}>
                      {blog.blogTitle}
                    </div>
                  </TableCell>
                  <TableCell className="border-none max-w-xs">
                    <div className="truncate" title={blog.blogDescription}>
                      {blog.blogDescription}
                    </div>
                  </TableCell>
                  <TableCell className="text-center border-none">
                    {formatDate(blog.createdAt)}
                  </TableCell>
                  <TableCell className="text-center border-none">
                    {blog.views}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(blog)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(blog)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div>
            Showing {(currentPage - 1) * meta.limit + 1}-
            {Math.min(currentPage * meta.limit, meta.total)} from {meta.total}
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
              const pageNumber = i + 1;
              return (
                <Button
                  key={i}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  className={`h-8 w-8 ${
                    currentPage === pageNumber ? "bg-green-500" : ""
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}

            {meta.totalPages > 5 && (
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
      </div>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedBlog?.blogTitle} ? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              Update the blog information below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitEdit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="blogTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="blogDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter blog description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateMutation.isPending} className="bg-green-500 hover:bg-green-600 text-white">
                  {updateMutation.isPending ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
