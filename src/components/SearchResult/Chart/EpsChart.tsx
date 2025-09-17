/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { GridComponent, GridComponentOption } from "echarts/components";
import { ScatterChart, ScatterSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

echarts.use([GridComponent, ScatterChart, CanvasRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | ScatterSeriesOption
>;

const MAX_POINTS = 30;

const EpsChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const axiosInstance = useAxios();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { dictionary, selectedLangCode } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["earnings-surprise", query],
    queryFn: async () => {
      if (!query) return [];
      const res = await axiosInstance(
        `/stocks/stock/earnings-surprise?symbol=${query}`
      );
      return res.data;
    },
    enabled: !!query,
  });

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    type EarningsSurprise = {
      period: string;
      estimate: number;
      actual: number;
      quarter: number;
      year: number;
    };

    const filteredData = (data || [])
      .filter(
        (item: EarningsSurprise) =>
          item.period && item.estimate != null && item.actual != null
      )
      .slice(0, MAX_POINTS)
      .reverse();

    const quarterLabels = filteredData.map(
      (item: EarningsSurprise) => `Q${item.quarter}`
    );

    const yearLabels = filteredData.map(
      (item: EarningsSurprise, index: number, arr: { year: any }[]) => {
        const current = item.year;
        const prev = arr[index - 1]?.year;
        return prev !== current ? `${current}` : "";
      }
    );

    const estimateData = filteredData.map(
      (item: EarningsSurprise) => item.estimate
    );
    const actualData = filteredData.map(
      (item: EarningsSurprise) => item.actual
    );

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params: any[]) => {
          return params
            .map(
              (p) =>
                `${p.seriesName}<br/>Quarter: ${quarterLabels[p.dataIndex]} ${
                  yearLabels[p.dataIndex] || ""
                }<br/>Value: ${p.value}`
            )
            .join("<br/><br/>");
        },
      },
      grid: {
        top: 60,
        bottom: 80, // more space for double x-axis
      },
      xAxis: [
        {
          type: "category",
          data: quarterLabels,
          position: "bottom",
          offset: 0,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            fontWeight: "bold",
            fontSize: 13,
          },
        },
        {
          type: "category",
          data: yearLabels,
          position: "bottom",
          offset: 25, // push down below quarters
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: "#666",
            fontSize: 12,
          },
        },
      ],
      yAxis: {
        type: "value",
        name: "EPS",
        nameLocation: "middle",
        nameGap: 50,
      },
      series: [
        {
          name: "Estimate",
          type: "scatter",
          symbolSize: 20,
          color: "#BCE4C5",
          data: estimateData,
        },
        {
          name: "Actual",
          type: "scatter",
          symbolSize: 20,
          color: "#28A745",
          data: actualData,
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, [data]);

  if (isLoading)
    return <div className="text-center text-lg h-[400px]">Loading...</div>;
  if (!data || data.length === 0) return <p>No data available.</p>;

  return (
    <div>
      <div>
        <h1 className="text-xl font-medium">{dictionary.earningsHistory}</h1>
        <p>
          {selectedLangCode === "ar"
            ? `عرض ${Math.min(data.length, MAX_POINTS)} فترات`
            : `Showing ${Math.min(data.length, MAX_POINTS)} periods`}
        </p>
      </div>
      <div ref={chartRef} style={{ height: "400px", width: "100%" }} />
    </div>
  );
};

export default EpsChart;
