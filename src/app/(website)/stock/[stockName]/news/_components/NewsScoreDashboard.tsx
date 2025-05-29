import { Info, LockIcon, Volume2, VolumeX } from "lucide-react";

export default function NewsScoreDashboard() {
  // Media Buzz data
  const mediaBuzzThisWeek = 150;
  const mediaBuzzWeeklyAverage = 176.74;
  const mediaBuzzThisWeekPercentage = (mediaBuzzThisWeek / 200) * 100;
  const mediaBuzzWeeklyAveragePercentage = (mediaBuzzWeeklyAverage / 200) * 100;

  // News Sentiment data
  const sentimentThisWeek = 50;
  const sentimentSectorAverage = 61;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">News Score - Last 7 Days</h1>
        <button className="text-gray-500">
          <Info size={24} />
        </button>
      </div>

      <div className="shadow-[0px_0px_8px_0px_#00000029]">
        {/* News Score Card (Locked) */}
        <div className="overflow-hidden mb-4">
          <div className="h-48 bg-gradient-to-r from-green-100 via-gray-100 to-blue-100 flex items-center justify-center">
            <div className="bg-orange-400 p-3 rounded-md">
              <LockIcon className="text-white" size={32} />
            </div>
          </div>
          <div className="h-1 bg-gray-300"></div>
        </div>

        {/* Media Buzz Card */}
        <div className="border-b border-gray-300 pb-5 px-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-700">Media Buzz</h2>
            <button className="text-gray-400">
              <Info size={20} />
            </button>
          </div>

          <div className="mb-2">
            <div className="flex flex-col items-center -mb-5">
              <span className="font-medium">This Week</span>
              <span className="text-gray-700">
                {mediaBuzzThisWeek} articles
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <VolumeX className="text-gray-500" size={24} />
            <div className="flex-1">
              <div className="relative py-6">
                {/* Progress Bar with Indicators */}
                <ProgressBar
                  fillGradient="from-gray-300 to-green-500"
                  topMarkerPosition={mediaBuzzWeeklyAveragePercentage}
                  bottomMarkerPosition={mediaBuzzThisWeekPercentage}
                />
              </div>
            </div>
            <Volume2 className="text-green-500" size={24} />
          </div>

          <div className="flex flex-col items-center -mt-5">
            <span className="font-medium">Weekly Average</span>
            <span className="text-gray-700">
              {mediaBuzzWeeklyAverage} articles
            </span>
          </div>
        </div>

        {/* News Sentiment Card */}
        <div className="pt-5 px-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-700">
              News Sentiment
            </h2>
            <button className="text-gray-400">
              <Info size={20} />
            </button>
          </div>

          <div className="mb-2">
            <div className="flex flex-col items-center -mb-5">
              <span className="font-medium">This Week</span>
              <span className="text-gray-700">{sentimentThisWeek}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <BearIcon className="text-green-500 h-10" />
            <div className="flex-1">
              <div className="relative py-6">
                {/* Progress Bar with Indicators */}
                <ProgressBar
                  fillGradient="from-green-500 via-gray-200 to-blue-500"
                  topMarkerPosition={sentimentSectorAverage}
                  bottomMarkerPosition={sentimentThisWeek}
                />
              </div>
            </div>
            <BullIcon className="text-blue-500" />
          </div>

          <div className="flex flex-col items-center -mt-5">
            <span className="font-medium">Sector Average</span>
            <span className="text-gray-700">{sentimentSectorAverage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({
  fillGradient,
  topMarkerPosition,
  bottomMarkerPosition,
}: {
  fillGradient: string;
  topMarkerPosition: number;
  bottomMarkerPosition: number;
}) {
  return (
    <div className="relative">
      {/* Tick marks container */}
      <div className="absolute inset-0 flex justify-between">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="w-px h-full bg-gray-200"></div>
        ))}
      </div>

      {/* Main progress bar */}
      <div className="relative h-4 bg-gray-300 rounded-full overflow-hidden">
        <div className={`h-full w-full bg-gradient-to-r ${fillGradient}`} />
      </div>

      {/* Top marker (pointing down) */}
      <div
        className="absolute"
        style={{
          left: `${topMarkerPosition}%`,
          top: "-14px",
          transform: "translateX(-50%)",
        }}
      >
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent border-t-gray-500" />
      </div>

      {/* Bottom marker (pointing up) */}
      <div
        className="absolute"
        style={{
          left: `${bottomMarkerPosition}%`,
          bottom: "-14px",
          transform: "translateX(-50%)",
        }}
      >
        <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent border-b-gray-500" />
      </div>
    </div>
  );
}

// Bear Icon Component
function BearIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-5-5.5a7.5 7.5 0 0 0 10 0V15H7v1.5zm1.5-6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
        fill="currentColor"
      />
    </svg>
  );
}

// Bull Icon Component
function BullIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-5-7.5h10V13H7v1.5zm1.5-5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
        fill="currentColor"
      />
    </svg>
  );
}
