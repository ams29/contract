'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  InfoIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
} from "lucide-react";

interface ProgressTrackerProps {
  contractData: any;
}

export function ProgressTracker({ contractData }: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0);
  const [vendorFlexibility, setVendorFlexibility] = useState(0);
  const [flexibilityTrend, setFlexibilityTrend] = useState<'up' | 'down' | null>(null);
  const [riskLevel, setRiskLevel] = useState("low");

  useEffect(() => {
    // Simulating progress calculation based on contract data
    const calculatedProgress = Math.min(
       100,
      Object.keys(contractData).length * 15,
    );
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= calculatedProgress) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    // Simulating vendor flexibility calculation
    const calculatedFlexibility = Math.floor(Math.random() * 30) + 60; // Random number between 60 and 90
    setVendorFlexibility(0);
    const flexibilityInterval = setInterval(() => {
      setVendorFlexibility((prev) => {
        if (prev >= calculatedFlexibility) {
          clearInterval(flexibilityInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 30);

    // Set flexibility trend
    setFlexibilityTrend(Math.random() > 0.5 ? "up" : "down");

    // Set risk level
    setRiskLevel(
      calculatedFlexibility > 75
        ? "low"
        : calculatedFlexibility > 60
          ? "medium"
          : "high",
    );

    return () => {
      clearInterval(progressInterval);
      clearInterval(flexibilityInterval);
    };
  }, [contractData]);

  const flexibilityColor =
    vendorFlexibility > 80
      ? "text-green-400"
      : vendorFlexibility > 60
        ? "text-yellow-400"
        : "text-red-400";

  const riskColors = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
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
            className="text-xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Negotiation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span
                  className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-300 bg-blue-900"
                >
                  {progress < 100 ? "Negotiating" : "Finalized"}
                </span>
              </div>
              <div className="text-right">
                <span
                  className="text-xs font-semibold inline-block text-blue-300"
                >
                  {progress.toFixed(0)}%
                </span>
              </div>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-blue-900 bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
          <p className="mt-2 text-sm text-gray-300">
            {progress < 100
              ? "AI is actively negotiating terms based on your data and market insights."
              : "Negotiation complete! Review the final terms and send to the vendor."}
          </p>
          <AnimatePresence>
            {progress >= 100 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-full hover:from-green-500 hover:to-blue-600 transition-all duration-300"
              >
                Send Proposal to Vendor
              </motion.button>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-[#2A2D3A]">
        <CardHeader>
          <CardTitle
            className="text-xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
          >
            Vendor Flexibility Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span
                className={`text-3xl font-bold ${flexibilityColor}`}
              >
                {vendorFlexibility}%
              </span>
              {flexibilityTrend === "up" ? (
                <TrendingUpIcon className="ml-2 text-green-400" />
              ) : (
                <TrendingDownIcon className="ml-2 text-red-400" />
              )}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  />
                </TooltipTrigger>
                <TooltipContent
                  className="bg-[#1E2029] text-white border-gray-600"
                >
                  <p>
                    Based on recent market trends, forum discussions, and
                    historical data
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Progress
            value={vendorFlexibility}
            className="h-2 bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-blue-500"
          />

          <p className="mt-2 text-sm text-gray-300">
            The AI predicts a {vendorFlexibility}% likelihood of the vendor
            accepting proposed changes.
            {vendorFlexibility > 80
              ? " Conditions are highly favorable for negotiation."
              : vendorFlexibility > 60
                ? " There's room for negotiation, but proceed cautiously."
                : " Vendor may be less flexible. Consider alternative strategies."}
          </p>
          <div className="mt-4 text-xs text-gray-400">
            <p>Recent insights from:</p>
            <ul className="list-disc list-inside mt-1">
              <li>
                ShipperTalk: Carriers showing openness to rate adjustments
              </li>
              <li>
                Twitter: @LogisticsInsider reports increased competition among
                carriers
              </li>
              <li>
                Reddit r/Shipping: Users reporting success in recent
                negotiations
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h3
              className="text-lg font-semibold mb-2 text-gray-200"
            >
              Negotiation Risk Assessment
            </h3>
            <div
              className={`flex items-center ${riskColors[riskLevel as keyof typeof riskColors]}`}
            >
              <AlertTriangleIcon className="mr-2" />
              <span className="font-bold capitalize">
                {riskLevel} Risk
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-300">
              {riskLevel === "low"
                ? "Favorable conditions for negotiation. Push for optimal terms."
                : riskLevel === "medium"
                  ? "Proceed with caution. Be prepared to compromise on some terms."
                  : "High risk of unfavorable terms. Consider alternative strategies or timing."}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
