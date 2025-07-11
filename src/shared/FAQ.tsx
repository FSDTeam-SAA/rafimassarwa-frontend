
import Image from "next/image"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type FAQItem = {
    question: string
    answer: string
}

const faqs: FAQItem[] = [
    {
        question: "Where does your stock data come from?",
        answer: "We use reliable market data providers for real-time and historical prices.",
    },
    {
        question: "How often is stock data updated?",
        answer: "Prices update in near real-time during market hours.",
    },
    {
        question: "Do you provide market news and analysis?",
        answer: "Yes, check the News page for daily updates and expert insights.",
    },
    {
        question: "Can I view charts for historical performance?",
        answer: " Yes, interactive charts are available for each stock.",
    },
    {
        question: "Is your service free?",
        answer: "We offer both free and premium plans with advanced features.",
    },
    {
        question: "How do I create an account?",
        answer: "Click Sign Up, fill in your details, and verify your email to get started.",
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we use encryption and secure servers to protect your information.",
    },
    {
        question: "Can I create multiple portfolios?",
        answer: "Yes, you can manage multiple portfolios under one account.",
    },
]

export default function FAQ() {
    return (
        <section className="w-full py-12 md:py-16 lg:py-20 bg-[#EAF6EC]">
            <div className="container mx-auto">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find quick answers to common questions about our market data, account setup,
                        security, and services. If you can&apos;t find what you&apos;re looking for, feel free to contact our support team anytime.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="lg:w-[75%]">
                        <Accordion type="single" collapsible className="w-full space-y-3" defaultValue="item-0">
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
        </section >
    )
}
