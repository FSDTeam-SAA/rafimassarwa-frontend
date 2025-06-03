import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const earnings = [
  {
    id: 1,
    image: "/images/news-cart.png",
    category: "Market News",
    title: "Apple fixes Passwords bug that exposed users to phishing attacks, Verge says.....",
    time: "3m ago",
    color: "bg-red-900",
  },
  {
    id: 2,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Bitcoin jumps 5% as ETF approval speculations rise.....",
    time: "5m ago",
    color: "bg-green-900",
  },
  {
    id: 3,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Bitcoin jumps 5% as ETF approval speculations rise.....",
    time: "5m ago",
    color: "bg-green-900",
  },
  {
    id: 4,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Bitcoin jumps 5% as ETF approval speculations rise.....",
    time: "5m ago",
    color: "bg-green-900",
  },
  {
    id: 5,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Bitcoin jumps 5% as ETF approval speculations rise.....",
    time: "5m ago",
    color: "bg-green-900",
  },
  {
    id: 6,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Bitcoin jumps 5% as ETF approval speculations rise.....",
    time: "5m ago",
    color: "bg-green-900",
  },
  {
    id: 7,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Bitcoin jumps 5% as ETF approval speculations rise.....",
    time: "5m ago",
    color: "bg-green-900",
  },
  {
    id: 8,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Bitcoin jumps 5% as ETF approval speculations rise.....",
    time: "5m ago",
    color: "bg-green-900",
  },
  {
    id: 9,
    image: "/images/news-cart.png",
    category: "Crypto News",
    title: "Bitcoin jumps 5% as ETF approval speculations rise.....",
    time: "5m ago",
    color: "bg-green-900",
  },
  
];

type Props = {
  id: number;
  image: string;
  category: string;
  title: string;
  time: string;
  color: string;
};

export default function MoreFromTip() {
  return (
    <div className="mb-[80px] container mx-auto">
      <h1 className="text-[32px] font-semibold mb-6">More From Olive Stock</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {earnings.map((earning: Props) => (
          <div key={earning.id} className="border rounded-xl pb-2">
            <div>
              <Image
                src={earning.image}
                alt="Stock market chart"
                width={300}
                height={200}
                className={`w-full object-cover mb-2 ${earning.color} rounded-t-xl h-[200px]`}
              />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-2 px-2 mt-5">
                {earning.category}
              </div>
              <h3 className="text-sm font-medium mb-2 px-2">{earning.title}</h3>
              <div className="flex items-center justify-between mt-auto px-2 py-3">
                <span className="text-xs text-gray-500">{earning.time}</span>
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

      <div className="flex justify-end mt-4">
        <Link href="#" className="text-xs text-blue-500 hover:underline">
          More Stock Analysis & News &gt;
        </Link>
      </div>
    </div>
  );
}
