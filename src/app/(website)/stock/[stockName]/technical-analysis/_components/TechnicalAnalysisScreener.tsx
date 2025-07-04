import { Button } from "@/components/ui/button";

export default function TechnicalAnalysisScreener() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background with gradient and image blend */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #0a0e17, #131b2b), url("/images/screener.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16 min-h-[300px]">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Technical Analysis <span className="text-[#4CD964]">Screener.</span>
        </h1>

        <Button className="mt-6 bg-[#4CD964] hover:bg-[#3abb53] text-black font-medium rounded-full px-8">
          Try It Now!
        </Button>

        <p className="mt-6 text-gray-300 max-w-md mx-auto">
          Customize your technical analysis to fit your unique trading strategy
          with a flexible screener
        </p>
      </div>
    </div>
  );
}
