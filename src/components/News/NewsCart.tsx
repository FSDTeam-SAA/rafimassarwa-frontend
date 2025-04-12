import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const smallArticles = [
  {
    id: 1,
    image: "/images/news-cart.png",
    category: "Market News",
    title:
      "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says.....",
    time: "3m ago",
  },
  {
    id: 2,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says.....",
    time: "5m ago",
  },
  {
    id: 3,
    image: "/images/news-cart.png",
    category: "Global Markets",
    title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says.....",
    time: "10m ago",
  },
];

const NewsCart = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
      {smallArticles.map((article) => (
        <div key={article.id} className="border rounded-xl pb-2">
          <div>
            <Image
              src={article.image}
              alt="Stock market chart"
              width={300}
              height={200}
              className="w-full object-cover mb-2 bg-black rounded-t-xl h-[200px]"
            />
          </div>
          <div className="">
            <div className="text-xs text-gray-500 mb-2 px-2 mt-5">{article.category}</div>
            <h3 className="text-sm font-medium mb-2 px-2">{article.title}</h3>
            <div className="flex items-center justify-between mt-auto px-2 py-3">
              <span className="text-xs text-gray-500">{article.time}</span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-7 px-3 border-[#2695FF] text-[#2695FF]"
              >
                READ
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCart;
