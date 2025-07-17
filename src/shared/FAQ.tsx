"use client";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/providers/LanguageProvider";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const { dictionary, selectedLangCode } = useLanguage();

  const faqs: FAQItem[] = [
    {
      question: dictionary.q1,
      answer: dictionary.q2,
    },
    {
      question: dictionary.q3,
      answer: dictionary.q4,
    },
    {
      question: dictionary.q5,
      answer: dictionary.q6,
    },
    {
      question: dictionary.q7,
      answer: dictionary.q8,
    },
    {
      question: dictionary.q9,
      answer: dictionary.q10,
    },
    {
      question: dictionary.q11,
      answer: dictionary.q12,
    },
    {
      question: dictionary.q13,
      answer: dictionary.q14,
    },
    {
      question: dictionary.q15,
      answer: dictionary.q16,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[#EAF6EC]">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {selectedLangCode === "en"
              ? dictionary.fqTitle
              : dictionary.fqTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {selectedLangCode === "en"
              ? dictionary.fqDesc
              : dictionary.fqDesc}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="lg:w-[75%]">
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3"
              defaultValue="item-0"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-[#d0e8d0] rounded-lg overflow-hidden bg-white transition-all duration-300"
                >
                  <AccordionTrigger className="w-full flex justify-between items-center p-4 text-left">
                    <h3 className="font-medium text-lg">{faq.question}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:w-[20%] bg-white p-4 rounded-lg shadow-sm">
            <Image
              src="/images/explore_plan_page/faq.png"
              alt="Question marks illustration"
              width={400}
              height={500}
              className="w-full aspect-[3/5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
