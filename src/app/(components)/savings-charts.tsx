'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

interface AnimatedData {
  discountComparison: Array<Record<string, string | number>>;
  competitorComparison: Array<Record<string, string | number>>;
  potentialSavings: Array<Record<string, string | number>>;
  serviceBreakdown: Array<Record<string, string | number>>;
  historicalRates: Array<Record<string, string | number>>;
}

interface SavingsChartsProps {
  contractData: {
    carrier: string;
    totalSpend: number;
    services: Array<{
      type: string;
      weightRange: string;
      currentDiscount: string;
    }>;
  };
}

export function SavingsCharts({ contractData }: SavingsChartsProps) {
  const [activeTab, setActiveTab] = useState("discount");
  const [animatedData, setAnimatedData] = useState<AnimatedData>({
    discountComparison: [],
    competitorComparison: [],
    potentialSavings: [],
    serviceBreakdown: [],
    historicalRates: [],
  });

  useEffect(() => {
    const targetData = {
      discountComparison: contractData.services.map((service: { type: any; weightRange: any; currentDiscount: string; }) => ({
        name: `${service.type} (${service.weightRange})`,
        current: parseFloat(service.currentDiscount),
        recommended: parseFloat(service.currentDiscount) + 5,
        industry: parseFloat(service.currentDiscount) + 2,
      })),
      competitorComparison: [
        { name: contractData.carrier, discount: 25 },
        { name: "FedEx", discount: 27 },
        { name: "DHL", discount: 23 },
        { name: "USPS", discount: 26 },
      ],

      potentialSavings: [
        { name: "Current Spend", amount: contractData.totalSpend },
        { name: "Potential Spend", amount: contractData.totalSpend * 0.9 },
      ],

      serviceBreakdown: contractData.services.map((service: { type: any; weightRange: any; }, index: any) => ({
        name: `${service.type} (${service.weightRange})`,
        value: 100 / contractData.services.length,
      })),
      historicalRates: [
        {
          year: 2019,
          [contractData.carrier]: 100,
          FedEx: 102,
          DHL: 98,
        },
        {
          year: 2020,
          [contractData.carrier]: 103,
          FedEx: 104,
          DHL: 101,
        },
        {
          year: 2021,
          [contractData.carrier]: 105,
          FedEx: 107,
          DHL: 104,
        },
        {
          year: 2022,
          [contractData.carrier]: 108,
          FedEx: 110,
          DHL: 107,
        },
        {
          year: 2023,
          [contractData.carrier]: 112,
          FedEx: 113,
          DHL: 110,
        },
      ],
    };

    const animationDuration = 1500;
    const steps = 60;
    const stepDuration = animationDuration / steps;

    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps) {
        clearInterval(interval);
        setAnimatedData(targetData);
        return;
      }

      const progress = step / steps;
      const easedProgress = easeOutCubic(progress);

      setAnimatedData((prevData) => ({
        discountComparison: interpolateArrayData(
          prevData.discountComparison,
          targetData.discountComparison,
          easedProgress,
        ),
        competitorComparison: interpolateArrayData(
          prevData.competitorComparison,
          targetData.competitorComparison,
          easedProgress,
        ),
        potentialSavings: interpolateArrayData(
          prevData.potentialSavings,
          targetData.potentialSavings,
          easedProgress,
        ),
        serviceBreakdown: interpolateArrayData(
          prevData.serviceBreakdown,
          targetData.serviceBreakdown,
          easedProgress,
        ),
        historicalRates: interpolateArrayData(
          prevData.historicalRates,
          targetData.historicalRates,
          easedProgress,
        ),
      }));

      step++;
    }, stepDuration);

    return () => clearInterval(interval);
  }, [contractData]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const interpolateArrayData = (prevArray: any[], targetArray: any[], progress: number) => {
    if (prevArray.length !== targetArray.length) {
      return targetArray.map((item) => ({ ...item }));
    }
    return prevArray.map((item, index) => {
      const newItem = { ...item };
      Object.keys(targetArray[index]).forEach((key) => {
        if (typeof targetArray[index][key] === "number") {
          newItem[key] =
            prevArray[index][key] +
            (targetArray[index][key] - prevArray[index][key]) * progress;
        } else {
          newItem[key] = targetArray[index][key];
        }
      });
      return newItem;
    });
  };

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any[]; label: string }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip bg-[#2A2D3A] p-3 rounded-md shadow-lg border border-gray-600"
        >
          <p
            className="label text-white"
          >{`${label} : ${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="overflow-hidden bg-[#2A2D3A] text-white">
        <CardHeader className="text-center">
          <CardTitle
            className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            AI-Powered Savings Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="discount">
                Discount Comparison
              </TabsTrigger>
              <TabsTrigger value="competitor">
                Competitor Analysis
              </TabsTrigger>
              <TabsTrigger value="savings">
                Potential Savings
              </TabsTrigger>
              <TabsTrigger value="breakdown">
                Service Breakdown
              </TabsTrigger>
              <TabsTrigger value="historical">
                Historical Rates
              </TabsTrigger>
            </TabsList>
            <TabsContent value="discount">
              <ChartContainer config={{}} className="h-[400px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={animatedData.discountComparison}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#444"
                    />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis
                      tickFormatter={formatPercentage}
                      stroke="#888"
                    />
                    <Tooltip
                      content={<CustomTooltip active={false} payload={[]} label="" />}
                    />
                    <Legend />
                    <Bar
                      dataKey="current"
                      name="Current Discount"
                      fill="#8884d8"
                    />

                    <Bar
                      dataKey="recommended"
                      name="Recommended Discount"
                      fill="#82ca9d"
                    />

                    <Bar
                      dataKey="industry"
                      name="Industry Average"
                      fill="#ffc658"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="mt-4 text-sm text-gray-300">
                This chart compares your current discounts with our
                AI-recommended discounts and the industry average. Consider
                negotiating towards the recommended discounts to optimize your
                contract.
              </p>
            </TabsContent>
            <TabsContent value="competitor">
              <ChartContainer config={{}} className="h-[400px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={animatedData.competitorComparison}
                    layout="vertical"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#444"
                    />
                    <XAxis
                      type="number"
                      tickFormatter={formatPercentage}
                      stroke="#888"
                    />

                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#888"
                    />
                    <Tooltip
                      content={<CustomTooltip active={false} payload={[]} label="" />}
                    />
                    <Legend />
                    <Bar
                      dataKey="discount"
                      name="Average Discount"
                      fill="#8884d8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="mt-4 text-sm text-gray-300">
                This chart shows how your carrier's discounts compare to
                competitors in the industry. Use this information to negotiate
                better rates with your current carrier or consider alternatives.
              </p>
            </TabsContent>
            <TabsContent value="savings">
              <ChartContainer config={{}} className="h-[400px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={animatedData.potentialSavings}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#444"
                    />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis
                      tickFormatter={formatCurrency}
                      stroke="#888"
                    />
                    <Tooltip
                      content={<CustomTooltip active={false} payload={[]} label="" />}
                    />
                    <Legend />
                    <Bar dataKey="amount" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="mt-4 text-sm text-gray-300">
                This chart illustrates your potential savings based on our
                AI-recommended contract terms. The difference between your
                current spend and potential spend represents your savings
                opportunity.
              </p>
            </TabsContent>
            <TabsContent value="breakdown">
              <ChartContainer config={{}} className="h-[400px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={animatedData.serviceBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {animatedData.serviceBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="mt-4 text-sm text-gray-300">
                This chart breaks down your shipping services by volume or
                spend. Use this information to identify which services to
                prioritize in your negotiations.
              </p>
            </TabsContent>
            <TabsContent value="historical">
              <ChartContainer config={{}} className="h-[400px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={animatedData.historicalRates}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#444"
                    />
                    <XAxis dataKey="year" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={contractData.carrier}
                      stroke="#8884d8"
                    />

                    <Line
                      type="monotone"
                      dataKey="FedEx"
                      stroke="#82ca9d"
                    />
                    <Line
                      type="monotone"
                      dataKey="DHL"
                      stroke="#ffc658"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <p className="mt-4 text-sm text-gray-300">
                This chart shows the historical rate trends for your current
                carrier and major competitors. Use this information to
                understand long-term pricing patterns and negotiate future
                rates.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
