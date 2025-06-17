// "use client";

// import { useSession } from "next-auth/react";
// import React, { createContext, useState, useEffect, useContext } from "react";
// import { io, Socket } from "socket.io-client";
// import { toast } from "sonner";

// interface NotificationData {
//   _id: string;
//   message: string;
//   type: string;
//   auction?: {
//     _id: string;
//     title: string;
//     sku: string;
//   };
//   read: boolean;
//   createdAt: string;
//   notificationCount?: number;
// }

// interface SocketContextType {
//   socket: Socket | null;
//   notifications: NotificationData[];
//   setNotifications: React.Dispatch<React.SetStateAction<NotificationData[]>>;
//   notificationCount: NotificationData | null;
//   setNotificationCount: React.Dispatch<
//     React.SetStateAction<NotificationData | null>
//   >;
// }

// const SocketContext = createContext<SocketContextType | undefined>(undefined);

// export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [notifications, setNotifications] = useState<NotificationData[]>([]);
//   const session = useSession();
//   const token = session?.data?.user?.accessToken;
//   const userID = session?.data?.user?.id;
//   const [listenerSet, setListenerSet] = useState(false);
//   const [notificationCount, setNotificationCount] = useState(() => {
//     // Read from localStorage during first render
//     if (typeof window !== "undefined") {
//       const stored = localStorage.getItem("notificationCount");
//       return stored ? JSON.parse(stored) : { notificationCount: 0 };
//     }
//     return { notificationCount: 0 };
//   });

//   useEffect(() => {
//     if (notificationCount !== null) {
//       localStorage.setItem(
//         "notificationCount",
//         JSON.stringify(notificationCount)
//       );
//     }
//   }, [notificationCount]);

//   useEffect(() => {
//     if (token && !socket) {
//       const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
//         extraHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSocket(socket);
//     }

//     if (socket) {
//       socket.emit(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
//       socket.on("content",(data: NotificationData) => {

//         console.log("notification:", data);
//         toast.success(data.message);
//       });
//       setListenerSet(true);
//       return () => {
//         socket.disconnect();
//         setSocket(null);
//       };
//     }
//   }, [token, socket, listenerSet, userID]);

//   // console.log(socket);
//   // console.log("all notifications : ", notifications);

//   // useEffect(() => {
//   //   if (!token || socket || listenerSet) return;

//   //   const newSocket = io("http://localhost:5100", {
//   //     extraHeaders: {
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //   });

//   //   newSocket.emit("joinUser", userID);

//   //   newSocket.on("notification", (data: NotificationData) => {
//   //     setNotifications((prev) => [data, ...prev]);
//   //     console.log("notification:", data);
//   //     toast.success(data.message);
//   //   });

//   //   setSocket(newSocket);
//   //   setListenerSet(true);

//   //   return () => {
//   //     newSocket.disconnect();
//   //     setSocket(null)
//   //   };
//   // }, [token, socket, listenerSet, userID]);

//   return (
//     <SocketContext.Provider
//       value={{
//         socket,
//         notifications,
//         setNotifications,
//         notificationCount,
//         setNotificationCount,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocketContext = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("useSocketContext must be used within a SocketProvider");
//   }
//   return context;
// };


"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface FinnhubContextType {
  sendMessage: (message: string) => void;
  lastMessage: unknown;
}

const FinnhubContext = createContext<FinnhubContextType | undefined>(undefined);

export const FinnhubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastMessage, setLastMessage] = useState<unknown>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const [openPrice, setOpenPrice] = useState<number | null>(null);
const [currentPrice, setCurrentPrice] = useState<number | null>(null);
const [priceChange, setPriceChange] = useState<{ amount: number; percent: number } | null>(null);

useEffect(() => {
  const fetchOpenPrice = async () => {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    );
    const data = await res.json();
    setOpenPrice(data.o); // "o" = open price
  };

  fetchOpenPrice();
}, []);
console.log(openPrice)


// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ Connected to Finnhub WebSocket");
      // Example: Subscribe to a symbol
      socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));

    };

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data)

    console.log("sdd")
    const latestPrice = data?.data[0]?.p;
    setCurrentPrice(latestPrice);
    console.log(currentPrice)

    if (openPrice !== null) {
        console.log("dkljasf")
      const diff = latestPrice - openPrice;
      const percent = (diff / openPrice) * 100;

      setPriceChange({
        amount: diff,
        percent: percent,
      });
    }

    setLastMessage(data);

  console.log(priceChange)
};

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    socket.onclose = () => {
      console.warn("🔌 Finnhub WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket not connected");
    }
  };

  return (
    <FinnhubContext.Provider value={{ sendMessage, lastMessage }}>
      {children}
    </FinnhubContext.Provider>
  );
};

export const useFinnhub = () => {
  const context = useContext(FinnhubContext);
  if (!context) {
    throw new Error("useFinnhub must be used within a FinnhubProvider");
  }
  return context;
};
