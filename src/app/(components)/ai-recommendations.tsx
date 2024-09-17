'use client';

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react";

interface ContractData {
  services: {
    currentDiscount: number;
  }[];
  totalSpend: number;
}

export function AIRecommendations({ contractData }: { contractData: ContractData }) {
  const recommendations = [
    {
      title: "Optimize Ground Service Rates",
      description: `Based on your current Ground service discounts of ${contractData.services[0].currentDiscount}% for 1-5 lbs and ${contractData.services[1].currentDiscount}% for 6-10 lbs, we recommend pushing for a 16-20% discount across all weight ranges. Our analysis of companies with similar shipping volumes ($${(contractData.totalSpend / 1000000).toFixed(2)} million annually) shows that top performers have secured discounts in this range. Emphasize your consistent shipping volume and long-term partnership potential to justify this increase.`,
      competitorInfo:
        "FedEx is currently offering a 18% discount on Ground services for similar shipping profiles. Use this as leverage in your UPS negotiations.",
      potentialSavings: `Potential annual savings: $${((0.18 - 0.11) * contractData.totalSpend * 0.4).toLocaleString()} (assuming 40% of your spend is on Ground services)`,
      trend: "up",
    },
    {
      title: "Enhance 2nd Day Air Discounts",
      description: `Your current ${contractData.services[2].currentDiscount} discount on 2nd Day Air for 1-10 lbs and ${contractData.services[3].currentDiscount} for 11-20 lbs is below the industry average for your shipping volume. We recommend targeting a 23-26% discount, particularly if you can commit to increasing your 2nd Day Air volume. This service often provides higher margins for carriers, allowing more room for negotiation.`,
      competitorInfo:
        "DHL Express is offering a 24% discount on their comparable 2-3 day services. Consider mentioning this in your negotiations or exploring DHL as an alternative for these shipments.",
      potentialSavings: `Potential annual savings: $${((0.245 - 0.165) * contractData.totalSpend * 0.3).toLocaleString()} (assuming 30% of your spend is on 2nd Day Air)`,
      trend: "up",
    },
    {
      title: "Maximize Next Day Air Value",
      description: `Your ${contractData.services[4].currentDiscount} discount on Next Day Air for 1-5 lbs and ${contractData.services[5].currentDiscount} for 6-10 lbs is competitive, but there's room for improvement. For companies with your shipping profile, we've seen discounts reach 27-30%. Propose a tiered discount structure where your discount increases as you hit certain volume thresholds, starting at 25% and scaling up to 30% for higher volumes.`,
      competitorInfo:
        "USPS Priority Mail Express offers flat rates that can be up to 32% cheaper for certain weight ranges and destinations. Consider using this for some of your overnight shipments to diversify and potentially lower costs.",
      potentialSavings: `Potential annual savings: $${((0.285 - 0.21) * contractData.totalSpend * 0.3).toLocaleString()} (assuming 30% of your spend is on Next Day Air)`,
      trend: "up",
    },
    {
      title: "Implement Minimum Commitment Tiers",
      description: `Offer to commit to a minimum annual spend of $${(contractData.totalSpend * 1.1).toLocaleString()} (a 10% increase from your current spend) in exchange for an additional 2-3% discount across all services. This gives UPS revenue security and justifies better rates for you. Structure the commitment with quarterly targets to maintain flexibility.`,
      potentialSavings: `Potential annual savings: $${(0.025 * contractData.totalSpend).toLocaleString()} (assuming a 2.5% additional discount on total spend)`,
      trend: "up",
    },
    {
      title: "Negotiate Accessorial Charges",
      description:
        "Focus on reducing or waiving accessorial fees, especially those that frequently apply to your shipments (e.g., residential delivery fees, fuel surcharges). Even a 50% reduction in these fees can significantly impact your overall shipping costs. Target a 40-60% discount on residential surcharges and a 10-15% cap on fuel surcharges.",
      potentialSavings: `Estimated annual savings: $${(0.05 * contractData.totalSpend).toLocaleString()} (assuming accessorial charges make up 10% of your total spend and you achieve a 50% reduction)`,
      trend: "down",
    },
    {
      title: "Explore Multi-Carrier Strategy",
      description: `While UPS is your primary carrier, consider allocating 20-30% of your volume to a secondary carrier. This diversification can provide leverage in negotiations and protect against service disruptions. It also allows you to optimize based on each carrier's strengths in different services or regions. Aim to shift about $${(contractData.totalSpend * 0.25).toLocaleString()} of your annual spend to an alternative carrier for better overall rates and service.`,
      competitorInfo:
        "FedEx and DHL are actively seeking to expand their market share and may offer aggressive rates to win a portion of your business.",
      potentialSavings: `Potential annual savings: $${(0.03 * contractData.totalSpend).toLocaleString()} (assuming a 3% overall reduction in shipping costs through carrier diversification)`,
      trend: "up",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="bg-[#2A2D3A] text-white">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="border-b border-gray-700 pb-4 last:border-b-0"
            >
              <h3
                className="text-lg font-semibold text-blue-300 mb-2 flex items-center"
              >
                {recommendation.title}
                {recommendation.trend === "up" ? (
                  <ArrowUpIcon
                    className="ml-2 h-5 w-5 text-green-400"
                  />
                ) : (
                  <ArrowDownIcon
                    className="ml-2 h-5 w-5 text-red-400"
                  />
                )}
              </h3>
              <p className="text-gray-300 mb-2">
                {recommendation.description}
              </p>
              {recommendation.competitorInfo && (
                <p className="text-sm text-gray-400 italic mb-2">
                  Competitor insight: {recommendation.competitorInfo}
                </p>
              )}

              {recommendation.potentialSavings && (
                <Badge
                  variant="secondary"
                  className="bg-green-900 text-green-100"
                >
                  <TrendingUpIcon className="mr-1 h-3 w-3" />
                  {recommendation.potentialSavings}
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
