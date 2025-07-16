"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";

const EarningChart = () => {
  const [activeTab, setActiveTab] = useState("Results");

  const axiosInstance = useAxios();
  const params = useSearchParams();

  const stock = params.get("q");

  // Fetch API data using React Query
  const { data: earningChart, isLoading } = useQuery({
    queryKey: ["earning-chart", stock],
    queryFn: async () => {
      if (!stock) return [];
      const res = await axiosInstance(
        `/stocks/stock/earnings-surprise?symbol=${stock}`
      );
      return res.data;
    },
    enabled: !!stock,
  });

  console.log(earningChart);

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div>
      {/* section 1 */}
      <div className="rounded-xl border shadow-md bg-[#eaf6ec]">
        <div className="flex justify-between items-center mb-4 bg-[#bce4c5] p-3 rounded-xl">
          <div>
            <h2 className="text-lg font-semibold">Q1 2025 Earnings</h2>
            <p className="text-sm text-muted-foreground">
              Mar 12, 2025, 4:00 PM (PT)
            </p>
          </div>
          <div className="text-green-600 text-xl">📅</div>
        </div>

        <div className="border-b-2 border-[#bfbfbf] flex gap-8 items-center pl-16">
          <button
            onClick={() => setActiveTab("Results")}
            className={`pb-2 border-b-2 transition-all duration-200 ${
              activeTab === "Results"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setActiveTab("Guidance")}
            className={`pb-2 border-b-2 transition-all duration-200 ${
              activeTab === "Guidance"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Guidance
          </button>
        </div>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="">REV</TableCell>
              <TableCell>
                $5.058{" "}
                <span className="text-xs text-muted-foreground">(est)</span>
              </TableCell>
              <TableCell>$5.718</TableCell>
              <TableCell className="text-green-600">0.99%</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">EPS</TableCell>
              <TableCell>
                $4.97{" "}
                <span className="text-xs text-muted-foreground">(est)</span>
              </TableCell>
              <TableCell>$5.08</TableCell>
              <TableCell className="text-green-600">2.21%</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-10 p-4 flex flex-col lg:flex-row justify-between items-center gap-5">
          <div>
            <Image
              src={"/images/three-icon.png"}
              alt="star img"
              height={100}
              width={100}
              className="hidden lg:block"
            />
          </div>

          <button className="w-full bg-[#cccccc] py-3 flex items-center justify-center gap-2 rounded-3xl text-green-600">
            <Image
              src={"/images/green-star.png"}
              alt="star img"
              height={20}
              width={20}
            />
            AI Summary{" "}
            <span className="bg-[#eaf6ec] px-3 rounded-sm text-green-500">
              Pro
            </span>
          </button>

          <button className="w-full bg-[#cccccc] py-3 flex items-center justify-center gap-2 rounded-3xl text-green-600">
            <Image
              src={"/images/slides.png"}
              alt="star img"
              height={20}
              width={20}
            />
            Slides{" "}
            <span className="bg-[#eaf6ec] px-3 rounded-sm text-green-500">
              Pro
            </span>
          </button>

          <button className="w-full bg-[#cccccc] py-3 flex items-center justify-center gap-2 rounded-3xl text-green-600">
            <Link href={`/tree?q=${stock}`}>
              <button className="w-full bg-[#cccccc] py-3 flex items-center justify-center gap-2 rounded-3xl text-green-600">
                <Image
                  src={"/images/transcript.png"}
                  alt="star img"
                  height={20}
                  width={20}
                />
                Tree{" "}
                <span className="bg-[#eaf6ec] px-3 rounded-sm text-green-500">
                  Pro
                </span>
              </button>
            </Link>
          </button>
        </div>
      </div>

      {/* section 2 */}
      <div className="rounded-xl border shadow-md mt-10 bg-[#f5f2fa]">
        <div className="bg-[#e2d9f1] flex justify-between items-center p-3 rounded-xl">
          <div>
            <h1 className="text-lg font-semibold">Q2 2025</h1>
            <p className="text-sm text-muted-foreground">
              Generated by AI, may be inaccurate
            </p>
          </div>

          <div>
            <Image
              src={"/images/star.png"}
              alt="star img"
              height={20}
              width={20}
            />
          </div>
        </div>

        <div className="my-8 w-[90%] mx-auto">
          <h1 className="font-semibold text-lg">
            Summary of Adobe s Q1 FY 23 Earnings Conference Call
          </h1>

          <h2 className="my-4 font-semibold text-lg">Positives:</h2>

          <ul className=" list-disc gap-2 flex flex-col ml-10">
            <li>
              Strong Financial Performance: Lorem ipsum is a dummy or
              placeholder text commonly used in graphic design, publishing, and
              web development. Lorem ipsum is a dummy or placeholder text
              commonly used in graphic design, publishing, and web development.
            </li>

            <li>
              Growth in Digital Media: Lorem ipsum is a dummy or placeholder
              text commonly used in graphic design, publishing, and web
              development. Lorem ipsum is a dummy or placeholder text commonly
              used in graphic design, publishing, and web development.
            </li>
          </ul>
        </div>

        <div className="text-center pb-4">
          <button className="bg-[#cccccc] w-[95%] py-3 rounded-3xl">
            AI Summary{" "}
            <span className="bg-[#eaf6ec] px-3 rounded-sm text-green-500">
              Pro
            </span>
          </button>
        </div>
      </div>

      {/* section 3 */}
      <div className="rounded-xl border shadow-md mt-10 bg-[#eaf3f9]">
        <div className="bg-[#c9d9e4] flex justify-between items-center p-3 rounded-xl">
          <div>
            <h1 className="text-lg font-semibold mb-1">
              Q2 2025 Earning in 87 Days
            </h1>

            <p className="text-sm text-muted-foreground">
              Jan 12, 2025, 4:00 PM (PT)
              <span className="bg-[#eaf6ec] px-3 rounded-sm text-green-500 ml-2">
                ESTIMATE
              </span>
            </p>
          </div>

          <div>
            <Image
              src={"/images/moon.png"}
              alt="star img"
              height={20}
              width={20}
            />
          </div>
        </div>

        <div className="mt-5 p-3 flex flex-col lg:flex-row gap-5 w-full">
          <div className="bg-[#c9d9e4] text-center p-3 rounded-xl lg:w-1/2">
            <p className="text-gray-500">Revenue</p>
            <h1 className="text-gray-500">
              <span className="font-semibold text-black">$5.88</span> (est)
            </h1>
          </div>

          <div className="bg-[#c9d9e4] text-center p-3 rounded-xl lg:w-1/2">
            <p className="text-gray-500">Revenue</p>
            <h1 className="text-gray-500">
              <span className="font-semibold text-black">$5.88</span> (est)
            </h1>
          </div>
        </div>

        <p className="mt-5 pb-4 text-center text-gray-500">
          Upgrade to View Corporate Guidance
        </p>
      </div>

      {/* section 4 */}
      <div className="rounded-xl border shadow-md mt-10 bg-[#e6e6e6]">
        <div className="bg-[#bfbfbf] flex justify-between items-center p-3 rounded-xl">
          <div>
            <h1 className="text-lg font-semibold mb-1">Previous Earnings</h1>
          </div>

          <div>
            <Image
              src={"/images/clock-rewind.png"}
              alt="star img"
              height={20}
              width={20}
            />
          </div>
        </div>

        <div className="px-3">
          <Accordion
            className="border-b-2 border-[#81808049]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h1 className="flex flex-col gap-1 items-start">
                  <span className="text-lg font-semibold">Q3 2024</span>
                  <span className="text-sm text-gray-500">
                    Dec 13, 2024, 4:00 PM (PT)
                  </span>
                </h1>
              </AccordionTrigger>

              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            className="border-b-2 border-[#81808049]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h1 className="flex flex-col gap-1 items-start">
                  <span className="text-lg font-semibold">Q3 2024</span>
                  <span className="text-sm text-gray-500">
                    Dec 13, 2024, 4:00 PM (PT)
                  </span>
                </h1>
              </AccordionTrigger>

              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            className="border-b-2 border-[#81808049]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h1 className="flex flex-col gap-1 items-start">
                  <span className="text-lg font-semibold">Q3 2024</span>
                  <span className="text-sm text-gray-500">
                    Dec 13, 2024, 4:00 PM (PT)
                  </span>
                </h1>
              </AccordionTrigger>

              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            className="border-b-2 border-[#81808049]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h1 className="flex flex-col gap-1 items-start">
                  <span className="text-lg font-semibold">Q3 2024</span>
                  <span className="text-sm text-gray-500">
                    Dec 13, 2024, 4:00 PM (PT)
                  </span>
                </h1>
              </AccordionTrigger>

              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            className="border-b-2 border-[#81808049]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h1 className="flex flex-col gap-1 items-start">
                  <span className="text-lg font-semibold">Q3 2024</span>
                  <span className="text-sm text-gray-500">
                    Dec 13, 2024, 4:00 PM (PT)
                  </span>
                </h1>
              </AccordionTrigger>

              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            className="border-b-2 border-[#81808049]"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h1 className="flex flex-col gap-1 items-start">
                  <span className="text-lg font-semibold">Q3 2024</span>
                  <span className="text-sm text-gray-500">
                    Dec 13, 2024, 4:00 PM (PT)
                  </span>
                </h1>
              </AccordionTrigger>

              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <p className="text-center py-4 text-gray-500">View More Earnings</p>
        </div>
      </div>
    </div>
  );
};

export default EarningChart;
