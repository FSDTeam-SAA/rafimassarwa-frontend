"use client";
import PathTracker from "../_components/PathTracker";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  followers: number;
}

const Page = () => {
  // Mock data for the table
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Ronald Richards",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "Lorem ipsum dolor sit amet.",
      email: "xeno@yandex.ru",
      followers: 2450,
    },
    {
      id: 2,
      name: "Bessie Cooper",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(225) 555-0118",
      email: "cadence@gmail.com",
      followers: 2450,
    },
    {
      id: 3,
      name: "Marvin McKinney",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(217) 555-0113",
      email: "fzaaaaa@gmail.com",
      followers: 2450,
    },
    {
      id: 4,
      name: "Eleanor Pena",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(702) 555-0122",
      email: "osgoodwy@gmail.com",
      followers: 2450,
    },
    {
      id: 5,
      name: "Cameron Williamson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(406) 555-0128",
      email: "rrian@yandex.ru",
      followers: 2450,
    },
    {
      id: 6,
      name: "Robert Fox",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(303) 555-0105",
      email: "qamrho@mail.ru",
      followers: 2450,
    },
    {
      id: 7,
      name: "Albert Flores",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(270) 555-0117",
      email: "redoniel@gmail.com",
      followers: 2450,
    },
    {
      id: 8,
      name: "Ralph Edwards",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(252) 555-0126",
      email: "seannand@gmail.ru",
      followers: 2450,
    },
    {
      id: 9,
      name: "Guy Hawkins",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(302) 555-0107",
      email: "ulfaha@mail.ru",
      followers: 2450,
    },
    {
      id: 10,
      name: "Wade Warren",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(208) 555-0112",
      email: "hamil@gmail.com",
      followers: 2450,
    },
    {
      id: 11,
      name: "Wade Warren",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "(208) 555-0112",
      email: "hamil@gmail.com",
      followers: 2450,
    },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      <div className="mb-8">
        <PathTracker />
      </div>

      <div>
        <div className="rounded-lg overflow-x-auto border border-[#b0b0b0]">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#b0b0b0]">
                <TableHead className=" text-center font-medium">Name</TableHead>
                <TableHead className=" text-center font-medium">Goal</TableHead>
                <TableHead className=" text-center font-medium">
                  About
                </TableHead>
                <TableHead className=" text-center font-medium">
                  Influencers
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id} className="border-b border-[#b0b0b0]">
                  <TableCell className="flex items-center gap-3 py-4 border-none">
                    <Avatar className="h-12 w-12 border border-gray-200">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </TableCell>
                  <TableCell className="border-none">{user.phone}</TableCell>
                  <TableCell className="border-none">{user.email}</TableCell>
                  <TableCell className="border-none">
                    {user.followers}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div>
            Showing {indexOfFirstUser + 1}-
            {Math.min(indexOfLastUser, users.length)} from {users.length}
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
              const pageNumber = i + 1;
              return (
                <Button
                  key={i}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  className={`h-8 w-8 ${
                    currentPage === pageNumber
                      ? "bg-green-500 border-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}

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
      </div>
    </div>
  );
};

export default Page;
