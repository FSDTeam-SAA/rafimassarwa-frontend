import { useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";

export default function EssentialServices() {
  const { dictionary, selectedLangCode } = useLanguage();

  const Services = [
    {
      icon: "/images/icon-1.png",
      title: dictionary.deepStockAnalysis,
      description: dictionary.aiBackedData,
    },
    {
      icon: "/images/icon-1.png",
      title: dictionary.buildStrongPortfolio,
      description: dictionary.expertGuidance,
    },
    {
      icon: "/images/icon-1.png",
      title: dictionary.smartSignals,
      description: dictionary.timelyRecommendations,
    },
    {
      icon: "/images/icon-1.png",
      title: dictionary.shariahScreening,
      description: dictionary.ethicalInvesting,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 dir={selectedLangCode === "ar" ? "rtl" : "ltr"} className="mb-12 text-center text-4xl font-bold">
          {dictionary.essentialServices}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-6 text-center shadow-2xl"
            >
              <div className="mb-4 h-16 w-16 flex-shrink-0">
                <Image
                  src={service.icon || "/placeholder.svg"}
                  alt={service.title}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
              <p className="text-blue-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
