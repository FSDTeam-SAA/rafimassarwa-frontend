
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

    console.log("sdd")
    const latestPrice = data?.data[0]?.p;
    setCurrentPrice(latestPrice);

    if (openPrice !== null) {
      const diff = latestPrice - openPrice;
      const percent = (diff / openPrice) * 100;

      setPriceChange({
        amount: diff,
        percent: percent,
      });
    }

    setLastMessage(data);
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
