import Image from "next/image";
import Link from "next/link";

interface MarketNewsCardProps {
  image: string;
  title: string;
  category?: string;
  timeAgo: string;
  tags: Array<{
    name: string;
    color?: string;
  }>;
  showBannerAd?: boolean;
  url?: string;
}

export default function MarketNewsCard({
  category,
  image,
  title,
  timeAgo,
  tags,
  url,
}: MarketNewsCardProps) {
  return (
    <Link href={`${url}`}>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Image wrapper with consistent aspect ratio */}
        <div className="relative w-full aspect-[5/3]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="p-4">
          {category && (
            <div className="text-sm font-medium text-gray-500">{category}</div>
          )}
          <h3 className="mt-1 text-lg font-semibold text-gray-900">{title.slice(0, 50)}...</h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">{timeAgo}</span>
            <div className="flex gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className="rounded-full border border-green-500 px-3 py-0.5 text-xs font-medium text-green-600"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
