export function shortTimeAgo(unixTimestamp: number): string {
  const seconds = Math.floor((Date.now() - unixTimestamp * 1000) / 1000);

  const units = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "w", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(seconds / unit.seconds);
    if (value >= 1) {
      return `${value}${unit.label} ago`;
    }
  }

  return "just now";
}
