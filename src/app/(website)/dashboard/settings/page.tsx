"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditProfileModal } from "./_components/edit-password-modal";
import { EditPasswordModal } from "./_components/edit-profile-modal";
import PathTracker from "../_components/PathTracker";
export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: "Bessie",
    lastName: "Edwards",
    username: "bessieedwards",
    email: "alma.lawson@example.com",
    phone: "(307) 555-0133",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleProfileUpdate = (newData: Partial<typeof profileData>) => {
    setProfileData({ ...profileData, ...newData });
    setIsProfileModalOpen(false);
    setIsPersonalInfoModalOpen(false);
  };

  return (
    <div>
      <div>
        <PathTracker />
      </div>

      <div className="py-10 space-y-8">
        <Card className="border border-[#b0b0b0] bg-inherit">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-green-100">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Profile picture"
                  width={100}
                  height={100}
                  className="object-cover border border-gray-500"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-500">@{profileData.username}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              Edit
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-[#b0b0b0] bg-inherit">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-xl font-bold">Personal Information</h3>
            <Button
              onClick={() => setIsPersonalInfoModalOpen(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <Input
                  value={profileData.firstName}
                  readOnly
                  className="bg-gray-50 bg-inherit border border-[#b0b0b0] read-only:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <Input
                  value={profileData.lastName}
                  readOnly
                  className="bg-gray-50 bg-inherit border border-[#b0b0b0] read-only:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  value={profileData.email}
                  readOnly
                  className="bg-gray-50 bg-inherit border border-[#b0b0b0] read-only:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  value={profileData.phone}
                  readOnly
                  className="bg-gray-50 bg-inherit border border-[#b0b0b0] read-only:cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <Textarea
                value={profileData.bio}
                readOnly
                className="bg-gray-50 bg-inherit border border-[#b0b0b0] read-only:cursor-not-allowed"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#b0b0b0] bg-inherit">
          <CardHeader className="pb-2">
            <h3 className="text-xl font-bold">Change password</h3>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <Input
                type="password"
                value="############"
                readOnly
                className="bg-gray-50 bg-inherit border border-[#b0b0b0] read-only:cursor-not-allowed"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <Input
                  type="password"
                  value="############"
                  readOnly
                  className="bg-gray-50 bg-inherit border border-[#b0b0b0] read-only:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value="############"
                  readOnly
                  className="bg-gray-50 bg-inherit border border-[#b0b0b0] read-only:cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <Button
                onClick={() => setIsPasswordModalOpen(true)}
                className="bg-green-500 hover:bg-green-600"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        <EditProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          profileData={profileData}
          onUpdate={handleProfileUpdate}
        />

        <EditProfileModal
          isOpen={isPersonalInfoModalOpen}
          onClose={() => setIsPersonalInfoModalOpen(false)}
          profileData={profileData}
          onUpdate={handleProfileUpdate}
          personalInfoOnly
        />

        <EditPasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      </div>
    </div>
  );
}
