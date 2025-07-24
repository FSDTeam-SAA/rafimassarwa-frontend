"use client";

import { useSocketContext } from "@/providers/SocketProvider";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";

interface Notification {
  link: string;
  _id: string;
  message: string;
  type: string;
}

export default function NotificationsPage() {
  const { newsNotification } = useSocketContext();

  useEffect(() => {
    if (newsNotification) {
      toast(newsNotification?.message);
    }
  }, [newsNotification]);

  const axiosInstance = useAxios();

  const { data: allNotifications } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: async () => {
      const res = await axiosInstance("/user/notification");
      return res.data;
    },
  });

  return (
    <div className="container mx-auto px-6 py-4 mt-16 min-h-[80vh] flex justify-center items-center">
      {/* <div className="border-b mb-2">
        <div className="flex text-sm">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "today"
                ? "text-green-500 border-b-2 border-sky-300"
                : "text-gray-600"
            }`}
            onClick={() => handleTabClick("today")}
          >
            Today ({todayCount})
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "previous"
                ? "text-green-500 border-b-2 border-sky-300"
                : "text-gray-600"
            }`}
            onClick={() => handleTabClick("previous")}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "mark"
                ? "text-green-500 border-b-2 border-sky-300"
                : "text-gray-600"
            }`}
            onClick={() => handleTabClick("mark")}
          >
            Mark as read
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "clear"
                ? " border-b-2 border-sky-300 text-red-500"
                : "text-red-600"
            }`}
            onClick={() => handleTabClick("clear")}
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <p className="text-sm text-gray-600 mr-2">Filter by type:</p>
        <select
          className="text-sm border rounded-md px-2 py-1"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="alert">Alerts</option>
          <option value="news">News</option>
          <option value="promotional">Promotional</option>
        </select>
      </div> */}

      <div className="space-y-0">
        <h1 className="text-4xl font-bold mb-5 text-center">Notifications</h1>
        {allNotifications?.length > 0 ? (
          allNotifications?.map((notification: Notification) => (
            <Link
              href={`${notification?.link}`}

              key={notification?._id}
            >
              <div className="flex items-center gap-2 py-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer transition-all duration-300">
                {/* {notification.unread ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                )} */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 pr-8 line-clamp-2">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="capitalize font-medium">
                      {notification?.type}
                    </span>{" "}
                    {/* • {notification.time} */}
                  </p>
                </div>

                <div className="flex flex-col gap-4 items-end">
                  {/* <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p> */}
                  {/* <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                    <MoreHorizontal className="h-5 w-5" />
                  </button> */}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            No notifications to display
          </div>
        )}
      </div>
    </div>
  );
}
