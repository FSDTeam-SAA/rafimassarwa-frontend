"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";

interface User {
  _id: string;
  userName: string;
  email: string;
  status: number;
}

const UserListTable = () => {
  const [currentPaidPage, setCurrentPaidPage] = useState(1);
  const [currentUnPaidPage, setCurrentUnPaidPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUserPaid = currentPaidPage * usersPerPage;
  const indexOfFirstUserPaid = indexOfLastUserPaid - usersPerPage;

  const indexOfLastUserUnPaid = currentUnPaidPage * usersPerPage;
  const indexOfFirstUserUnPaid = indexOfLastUserUnPaid - usersPerPage;

  const axiosInstance = useAxios();

  const { data: allUser = [], isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const res = await axiosInstance("/user/get-refer");
      return res?.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        Loading.....
      </div>
    );

  const paidUsers = allUser?.data?.paidUsers || [];
  const unpaidUsers = allUser?.data?.unpaidUsers || [];

  const totalPaidPages = Math.ceil(paidUsers.length / usersPerPage);
  const currentPaidUsers = paidUsers.slice(indexOfFirstUserPaid, indexOfLastUserPaid);

  const totalUnPaidPages = Math.ceil(unpaidUsers.length / usersPerPage);
  const currentUnPaidUsers = unpaidUsers.slice(indexOfFirstUserUnPaid, indexOfLastUserUnPaid);

  return (
    <div className="flex lg:flex-row flex-col gap-6 w-full">
      {/* Paid Users */}
      <div className="lg:w-1/2 w-full">
        <h1 className="text-xl font-semibold mb-4">Paid Users</h1>
        <div className="rounded-lg overflow-x-auto border border-[#b0b0b0]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#b0b0b0]">
                <TableHead className="text-center font-medium">Name</TableHead>
                <TableHead className="text-center font-medium">Email</TableHead>
                <TableHead className="text-center font-medium">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPaidUsers.map((user: User) => (
                <TableRow key={user._id} className="border-b border-[#b0b0b0]">
                  <TableCell className="flex items-center justify-center gap-3 py-4 border-none">
                    <span className="font-medium">{user.userName}</span>
                  </TableCell>
                  <TableCell className="border-none">{user.email}</TableCell>
                  <TableCell className="border-none">{user.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Conditional Pagination for Paid Users */}
        {paidUsers.length > usersPerPage && (
          <div className="flex items-center justify-between mt-4 text-sm">
            <div>
              Showing {indexOfFirstUserPaid + 1}-
              {Math.min(indexOfLastUserPaid, paidUsers.length)} from {paidUsers.length}
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPaidPage(currentPaidPage - 1)}
                disabled={currentPaidPage === 1}
              >
                &lt;
              </Button>
              {Array.from({ length: Math.min(5, totalPaidPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={i}
                    variant={currentPaidPage === pageNumber ? "default" : "outline"}
                    size="icon"
                    className={`h-8 w-8 ${
                      currentPaidPage === pageNumber
                        ? "bg-green-500 border-green-500 hover:bg-green-600"
                        : ""
                    }`}
                    onClick={() => setCurrentPaidPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPaidPage(currentPaidPage + 1)}
                disabled={currentPaidPage === totalPaidPages}
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Unpaid Users */}
      <div className="lg:w-1/2 w-full">
        <h1 className="text-xl font-semibold mb-4">Unpaid Users</h1>
        <div className="rounded-lg overflow-x-auto border border-[#b0b0b0]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#b0b0b0]">
                <TableHead className="text-center font-medium">Name</TableHead>
                <TableHead className="text-center font-medium">Email</TableHead>
                <TableHead className="text-center font-medium">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUnPaidUsers.map((user: User) => (
                <TableRow key={user._id} className="border-b border-[#b0b0b0]">
                  <TableCell className="flex items-center justify-center gap-3 py-4 border-none">
                    <span className="font-medium">{user.userName}</span>
                  </TableCell>
                  <TableCell className="border-none">{user.email}</TableCell>
                  <TableCell className="border-none">{user.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Conditional Pagination for Unpaid Users */}
        {unpaidUsers.length > usersPerPage && (
          <div className="flex items-center justify-between mt-4 text-sm">
            <div>
              Showing {indexOfFirstUserUnPaid + 1}-
              {Math.min(indexOfLastUserUnPaid, unpaidUsers.length)} from {unpaidUsers.length}
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentUnPaidPage(currentUnPaidPage - 1)}
                disabled={currentUnPaidPage === 1}
              >
                &lt;
              </Button>
              {Array.from({ length: Math.min(5, totalUnPaidPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={i}
                    variant={currentUnPaidPage === pageNumber ? "default" : "outline"}
                    size="icon"
                    className={`h-8 w-8 ${
                      currentUnPaidPage === pageNumber
                        ? "bg-green-500 border-green-500 hover:bg-green-600"
                        : ""
                    }`}
                    onClick={() => setCurrentUnPaidPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentUnPaidPage(currentUnPaidPage + 1)}
                disabled={currentUnPaidPage === totalUnPaidPages}
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListTable;
